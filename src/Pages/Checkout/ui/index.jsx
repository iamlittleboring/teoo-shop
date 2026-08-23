import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { NovaPoshtaLocationPicker } from "@entities/NovaPoshtaLocation";
import {
    buildCheckoutBreadcrumbItems,
    BreadCrumbs,
} from "@features/BreadCrumbs";
import {
    listPaymentProviders,
    listShippingOptions,
    readAmount,
    updateCustomerProfile,
    updateFormByEvent,
    useAuth,
    useCart,
} from "@shared/lib";
import arrowRightIcon from "@shared/assets/images/arrow-right.svg";
import trashIcon from "@shared/assets/images/trash.svg";
import { Container, Text } from "@shared/styles";
import {
    CheckboxBox,
    CheckboxInput,
    CheckboxLabel,
    Field,
    FieldsGrid,
    InputField,
    Label,
} from "@shared/styles/form";
import Button from "@shared/ui/Button";
import LoadingState from "@shared/ui/LoadingState";
import ModalProductItem from "@shared/ui/ModalProductItem";
import SectionTitle from "@shared/ui/SectionTitle";

import Styled from "./styled";

import { groupShippingOptionsByCarrier } from "../lib/shipping-carrier";
import {
    CARRIER_LABEL_KEYS,
    CARRIER_ORDER,
    NP_LOCATION_OPTION_CODES,
    PAYMENT_PROVIDER_LABEL_KEYS,
    STEP,
    STEP_KEYS,
    contactFormState,
} from "../config";

const CheckoutPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { customer, isAuthenticated } = useAuth();
    const favoriteWarehouse = customer?.metadata?.favoriteWarehouse || null;
    const {
        applyPromotion,
        cart,
        completeCart,
        initiatePaymentSession,
        isLoading: isCartLoading,
        items,
        removePromotion,
        setShippingMethod,
        totalPrice,
        updateCheckoutInfo,
    } = useCart();

    const [stepIndex, setStepIndex] = useState(STEP.CONTACT);
    const [contactForm, setContactForm] = useState(contactFormState);
    const [saveContactInfo, setSaveContactInfo] = useState(false);

    const [shippingOptions, setShippingOptions] = useState([]);
    const [selectedShippingOptionId, setSelectedShippingOptionId] = useState("");
    const [npLocationData, setNpLocationData] = useState(null);
    const [ukrposhtaWarehouseNumber, setUkrposhtaWarehouseNumber] = useState("");
    const [courierNote, setCourierNote] = useState("");

    const [paymentProviders, setPaymentProviders] = useState([]);
    const [selectedProviderId, setSelectedProviderId] = useState("");

    const [promoCode, setPromoCode] = useState("");
    const [isApplyingPromo, setIsApplyingPromo] = useState(false);
    const [promoError, setPromoError] = useState(null);

    const [isLoadingStepData, setIsLoadingStepData] = useState(false);
    const [isSubmittingStep, setIsSubmittingStep] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [stepError, setStepError] = useState(null);

    const hasPrefilledRef = useRef(false);

    const handleContactChange = updateFormByEvent(setContactForm);

    useEffect(() => {
        if (hasPrefilledRef.current || !cart) return;

        hasPrefilledRef.current = true;

        const address = cart.shipping_address;

        if (!cart.email && !address) return;

        setContactForm((prev) => ({
            ...prev,
            email: cart.email || prev.email,
            first_name: address?.first_name || prev.first_name,
            last_name: address?.last_name || prev.last_name,
            phone: address?.phone || prev.phone,
        }));
    }, [cart]);

    useEffect(() => {
        if (!customer) return;

        setContactForm((prev) => ({
            ...prev,
            email: prev.email || customer.email || "",
            first_name: prev.first_name || customer.first_name || "",
            last_name: prev.last_name || customer.last_name || "",
            phone: prev.phone || customer.phone || "",
        }));
    }, [customer]);

    useEffect(() => {
        if (stepIndex !== STEP.SHIPPING || !cart?.id || shippingOptions.length > 0) {
            return;
        }

        let cancelled = false;
        setIsLoadingStepData(true);

        listShippingOptions(cart.id)
            .then((options) => {
                if (cancelled) return;
                setShippingOptions(options);
                // A saved favorite branch means the customer almost certainly wants
                // NP warehouse delivery again — default to it instead of whichever
                // option happens to be listed first, so it (and the branch itself,
                // via NovaPoshtaLocationPicker's defaultLocation) is ready to go.
                const favoriteOptionId = favoriteWarehouse
                    ? options.find((option) => option.type?.code === "np-warehouse")?.id
                    : null;

                setSelectedShippingOptionId(
                    cart.shipping_methods?.[0]?.shipping_option_id ||
                        favoriteOptionId ||
                        options[0]?.id ||
                        ""
                );
            })
            .catch(() => {
                if (!cancelled) setStepError(t("checkout.errors.generic"));
            })
            .finally(() => {
                if (!cancelled) setIsLoadingStepData(false);
            });

        return () => {
            cancelled = true;
        };
    }, [stepIndex, cart?.id, cart?.shipping_methods, shippingOptions.length, favoriteWarehouse, t]);

    useEffect(() => {
        if (stepIndex !== STEP.PAYMENT || !cart?.region_id || paymentProviders.length > 0) {
            return;
        }

        let cancelled = false;
        setIsLoadingStepData(true);

        listPaymentProviders(cart.region_id)
            .then((providers) => {
                if (cancelled) return;
                setPaymentProviders(providers);
                setSelectedProviderId((prev) => prev || providers[0]?.id || "");
            })
            .catch(() => {
                if (!cancelled) setStepError(t("checkout.errors.generic"));
            })
            .finally(() => {
                if (!cancelled) setIsLoadingStepData(false);
            });

        return () => {
            cancelled = true;
        };
    }, [stepIndex, cart?.region_id, paymentProviders.length, t]);

    const goToStep = (index) => {
        setStepError(null);
        setStepIndex(index);
    };

    const handleSelectShippingOption = (optionId) => {
        setSelectedShippingOptionId(optionId);
        setNpLocationData(null);
        setUkrposhtaWarehouseNumber("");
        setCourierNote("");
    };

    const handleContactSubmit = async (event) => {
        event.preventDefault();

        if (isSubmittingStep) return;

        setStepError(null);
        setIsSubmittingStep(true);

        // No street address is collected here — every shipping option (NP
        // branch/postomat/courier, Ukrposhta) collects its own delivery
        // location in the shipping step. `country_code` still has to be set
        // for the cart so shipping options can resolve against it; the store
        // only ships within Ukraine, so it's fixed rather than asked for.
        const shippingAddress = {
            first_name: contactForm.first_name,
            last_name: contactForm.last_name,
            phone: contactForm.phone || undefined,
            country_code: "ua",
        };

        const result = await updateCheckoutInfo({
            email: contactForm.email,
            shippingAddress,
        });

        if (!result) {
            setIsSubmittingStep(false);
            setStepError(t("checkout.errors.generic"));
            return;
        }

        if (isAuthenticated && saveContactInfo) {
            await updateCustomerProfile({
                first_name: contactForm.first_name,
                last_name: contactForm.last_name,
                phone: contactForm.phone,
            }).catch(() => {});
        }

        setIsSubmittingStep(false);
        setStepIndex(STEP.SHIPPING);
    };

    const selectedShippingOption = shippingOptions.find(
        (option) => option.id === selectedShippingOptionId
    );
    const selectedShippingCode = selectedShippingOption?.type?.code;
    const selectedNpLocationType = NP_LOCATION_OPTION_CODES[selectedShippingCode];
    const needsUkrposhtaWarehouse = selectedShippingCode === "ukrposhta-warehouse";
    const isNpCourier = selectedShippingCode === "np-courier";
    const isShippingSelectionComplete =
        Boolean(selectedShippingOptionId) &&
        (!selectedNpLocationType || Boolean(npLocationData)) &&
        (!needsUkrposhtaWarehouse || Boolean(ukrposhtaWarehouseNumber.trim()));

    const handleShippingSubmit = async (event) => {
        event.preventDefault();

        if (isSubmittingStep || !isShippingSelectionComplete) return;

        setStepError(null);
        setIsSubmittingStep(true);

        const shippingMethodData = selectedNpLocationType
            ? {
                  ...npLocationData,
                  ...(isNpCourier ? { courierNote: courierNote.trim() || undefined } : {}),
              }
            : needsUkrposhtaWarehouse
              ? { ukrposhtaWarehouseNumber }
              : undefined;

        const result = await setShippingMethod(selectedShippingOptionId, shippingMethodData);

        setIsSubmittingStep(false);

        if (!result) {
            setStepError(t("checkout.errors.generic"));
            return;
        }

        setStepIndex(STEP.PAYMENT);
    };

    const handlePaymentSubmit = (event) => {
        event.preventDefault();

        if (!selectedProviderId) return;

        setStepError(null);
        setStepIndex(STEP.REVIEW);
    };

    const handlePlaceOrder = async () => {
        if (isPlacingOrder) return;

        setStepError(null);
        setIsPlacingOrder(true);

        // The payment session is only created here, on the final "place
        // order" click — not earlier when the provider was picked. This
        // also covers cart changes after a session already exists (e.g.
        // a promo code applied/removed invalidates it) by re-initiating
        // rather than failing at complete().
        if (!cart?.payment_collection?.payment_sessions?.length && selectedProviderId) {
            const sessionResult = await initiatePaymentSession(selectedProviderId);

            if (!sessionResult) {
                setIsPlacingOrder(false);
                setStepError(t("checkout.errors.generic"));
                return;
            }

            const pageUrl = sessionResult.payment_sessions?.[0]?.data?.pageUrl;

            if (pageUrl) {
                window.location.href = pageUrl;
                return;
            }
        }

        const result = await completeCart();

        setIsPlacingOrder(false);

        if (result?.order) {
            navigate("/order-confirmation", { state: { order: result.order } });
            return;
        }

        setStepError(result?.error || t("checkout.errors.generic"));
    };

    const handleApplyPromo = async (event) => {
        event.preventDefault();

        const code = promoCode.trim();

        if (!code || isApplyingPromo) return;

        setPromoError(null);
        setIsApplyingPromo(true);

        const result = await applyPromotion(code);

        setIsApplyingPromo(false);

        if (!result) {
            setPromoError(t("checkout.promo.invalid"));
            return;
        }

        setPromoCode("");
    };

    const handleRemovePromo = (code) => {
        removePromotion(code);
    };

    const hasHandledPaymentReturnRef = useRef(false);

    useEffect(() => {
        if (hasHandledPaymentReturnRef.current) return;
        if (searchParams.get("mono_return") !== "1") return;
        if (!cart?.payment_collection?.payment_sessions?.length) return;

        hasHandledPaymentReturnRef.current = true;
        setStepIndex(STEP.REVIEW);
        handlePlaceOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, cart?.payment_collection]);

    const breadcrumbItems = buildCheckoutBreadcrumbItems(t("checkout.title"));
    const shippingMethod = cart?.shipping_methods?.[0];
    const shippingOptionName = shippingOptions.find(
        (option) => option.id === shippingMethod?.shipping_option_id
    )?.name;
    const shippingTotal = readAmount(cart?.shipping_total);
    const grandTotal = readAmount(cart?.total) || totalPrice + shippingTotal;
    const selectedProviderLabelKey =
        PAYMENT_PROVIDER_LABEL_KEYS[selectedProviderId] || null;
    const shippingMethodData = shippingMethod?.data || {};
    const shippingLocationDetail =
        shippingMethodData.npWarehouseDescription ||
        shippingMethodData.npWarehouseNumber ||
        shippingMethodData.ukrposhtaWarehouseNumber ||
        shippingMethodData.deliveryAddress;
    const cartPromotions = cart?.promotions || [];
    const discountTotal = readAmount(cart?.discount_total);
    const itemsSubtotal = discountTotal
        ? readAmount(cart?.original_item_total) || totalPrice + discountTotal
        : totalPrice;

    if (isCartLoading) {
        return (
            <section>
                <Container>
                    <LoadingState message={t("common.loading")} fullPage />
                </Container>
            </section>
        );
    }

    if (items.length === 0) {
        return (
            <section>
                <Container>
                    <SectionTitle>{t("checkout.title")}</SectionTitle>
                    <Styled.Empty>
                        <Text>{t("checkout.emptyCart")}</Text>
                        <Button as={Link} to="/" size="s">
                            {t("checkout.emptyCartCta")}
                        </Button>
                    </Styled.Empty>
                </Container>
            </section>
        );
    }

    return (
        <section>
            <Container>
                <BreadCrumbs items={breadcrumbItems} />
                <SectionTitle>{t("checkout.title")}</SectionTitle>

                <Styled.Stepper>
                    {STEP_KEYS.map((key, index) => (
                        <Styled.Step
                            key={key}
                            as={index < stepIndex ? "button" : "div"}
                            type={index < stepIndex ? "button" : undefined}
                            onClick={index < stepIndex ? () => goToStep(index) : undefined}
                            $active={index === stepIndex}
                            $done={index < stepIndex}
                        >
                            <Styled.StepNumber $active={index === stepIndex} $done={index < stepIndex}>
                                {index < stepIndex ? "✓" : index + 1}
                            </Styled.StepNumber>
                            <Styled.StepLabel $active={index === stepIndex}>
                                {t(`checkout.steps.${key}`)}
                            </Styled.StepLabel>
                        </Styled.Step>
                    ))}
                </Styled.Stepper>

                <Styled.Layout>
                    <Styled.Main>
                        {stepError && <Styled.ErrorText>{stepError}</Styled.ErrorText>}

                        {stepIndex === STEP.CONTACT && (
                            <Styled.Form onSubmit={handleContactSubmit}>
                                <Field>
                                    <Label htmlFor="checkout-email">
                                        {t("checkout.fields.email")}
                                    </Label>
                                    <InputField
                                        id="checkout-email"
                                        name="email"
                                        type="email"
                                        value={contactForm.email}
                                        onChange={handleContactChange}
                                        placeholder={t("checkout.placeholders.email")}
                                        autoComplete="email"
                                        required
                                    />
                                </Field>

                                <FieldsGrid>
                                    <Field>
                                        <Label htmlFor="checkout-first-name">
                                            {t("checkout.fields.firstName")}
                                        </Label>
                                        <InputField
                                            id="checkout-first-name"
                                            name="first_name"
                                            value={contactForm.first_name}
                                            onChange={handleContactChange}
                                            placeholder={t("checkout.placeholders.firstName")}
                                            autoComplete="given-name"
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <Label htmlFor="checkout-last-name">
                                            {t("checkout.fields.lastName")}
                                        </Label>
                                        <InputField
                                            id="checkout-last-name"
                                            name="last_name"
                                            value={contactForm.last_name}
                                            onChange={handleContactChange}
                                            placeholder={t("checkout.placeholders.lastName")}
                                            autoComplete="family-name"
                                            required
                                        />
                                    </Field>
                                </FieldsGrid>

                                <Field>
                                    <Label htmlFor="checkout-phone">
                                        {t("checkout.fields.phone")}
                                    </Label>
                                    <InputField
                                        id="checkout-phone"
                                        name="phone"
                                        type="tel"
                                        value={contactForm.phone}
                                        onChange={handleContactChange}
                                        placeholder={t("checkout.placeholders.phone")}
                                        autoComplete="tel"
                                        required
                                    />
                                </Field>

                                {isAuthenticated && (
                                    <CheckboxLabel>
                                        <CheckboxInput
                                            type="checkbox"
                                            checked={saveContactInfo}
                                            onChange={(event) =>
                                                setSaveContactInfo(event.target.checked)
                                            }
                                        />
                                        <CheckboxBox aria-hidden="true" />
                                        {t("checkout.saveContactInfo")}
                                    </CheckboxLabel>
                                )}

                                <Styled.StepActions>
                                    <span />
                                    <Styled.ContinueButton
                                        type="submit"
                                        size="s"
                                        disabled={isSubmittingStep}
                                    >
                                        {t("checkout.continue")}
                                    </Styled.ContinueButton>
                                </Styled.StepActions>
                            </Styled.Form>
                        )}

                        {stepIndex === STEP.SHIPPING && (
                            <Styled.Form onSubmit={handleShippingSubmit}>
                                {isLoadingStepData && (
                                    <LoadingState message={t("checkout.loadingShippingOptions")} />
                                )}

                                {!isLoadingStepData && shippingOptions.length === 0 && (
                                    <Text>{t("checkout.noShippingOptions")}</Text>
                                )}

                                {!isLoadingStepData &&
                                    shippingOptions.length > 0 &&
                                    (() => {
                                        const grouped = groupShippingOptionsByCarrier(shippingOptions);

                                        return CARRIER_ORDER.filter((carrier) => grouped[carrier]?.length).map(
                                            (carrier) => (
                                                <Styled.CarrierGroup key={carrier}>
                                                    <Styled.CarrierTitle>
                                                        {t(CARRIER_LABEL_KEYS[carrier])}
                                                    </Styled.CarrierTitle>
                                                    <Styled.RadioList>
                                                        {grouped[carrier].map((option) => {
                                                            const npType =
                                                                NP_LOCATION_OPTION_CODES[option.type?.code];
                                                            const isUkrposhtaWarehouse =
                                                                option.type?.code === "ukrposhta-warehouse";
                                                            const isSelected =
                                                                selectedShippingOptionId === option.id;

                                                            return (
                                                                <div key={option.id}>
                                                                    <Styled.RadioCard>
                                                                        <Styled.RadioContent>
                                                                            <Styled.RadioInput
                                                                                type="radio"
                                                                                name="shipping-option"
                                                                                value={option.id}
                                                                                checked={isSelected}
                                                                                onChange={() =>
                                                                                    handleSelectShippingOption(
                                                                                        option.id
                                                                                    )
                                                                                }
                                                                            />
                                                                            <Styled.RadioIndicator aria-hidden="true" />
                                                                            <Styled.RadioName>
                                                                                {option.name}
                                                                            </Styled.RadioName>
                                                                        </Styled.RadioContent>
                                                                        <Styled.RadioPrice>
                                                                            {readAmount(option.amount)}{" "}
                                                                            {t("common.currency")}
                                                                        </Styled.RadioPrice>
                                                                    </Styled.RadioCard>

                                                                    {isSelected && npType && (
                                                                        <NovaPoshtaLocationPicker
                                                                            defaultLocation={
                                                                                npType === "warehouse"
                                                                                    ? favoriteWarehouse
                                                                                    : undefined
                                                                            }
                                                                            locationType={npType}
                                                                            onSelect={setNpLocationData}
                                                                            note={courierNote}
                                                                            onNoteChange={setCourierNote}
                                                                            t={t}
                                                                        />
                                                                    )}

                                                                    {isSelected && isUkrposhtaWarehouse && (
                                                                        <Styled.LocationPicker>
                                                                            <Field>
                                                                                <Label>
                                                                                    {t(
                                                                                        "checkout.ukrposhta.warehouseLabel"
                                                                                    )}
                                                                                </Label>
                                                                                <InputField
                                                                                    value={ukrposhtaWarehouseNumber}
                                                                                    onChange={(event) =>
                                                                                        setUkrposhtaWarehouseNumber(
                                                                                            event.target.value
                                                                                        )
                                                                                    }
                                                                                    placeholder={t(
                                                                                        "checkout.ukrposhta.warehousePlaceholder"
                                                                                    )}
                                                                                />
                                                                            </Field>
                                                                        </Styled.LocationPicker>
                                                                    )}

                                                                </div>
                                                            );
                                                        })}
                                                    </Styled.RadioList>
                                                </Styled.CarrierGroup>
                                            )
                                        );
                                    })()}

                                <Styled.StepActions>
                                    <Button
                                        type="button"
                                        size="s"
                                        appearance="ghost"
                                        onClick={() => goToStep(STEP.CONTACT)}
                                    >
                                        {t("checkout.back")}
                                    </Button>
                                    <Styled.ContinueButton
                                        type="submit"
                                        size="s"
                                        disabled={isSubmittingStep || !isShippingSelectionComplete}
                                    >
                                        {t("checkout.continue")}
                                    </Styled.ContinueButton>
                                </Styled.StepActions>
                            </Styled.Form>
                        )}

                        {stepIndex === STEP.PAYMENT && (
                            <Styled.Form onSubmit={handlePaymentSubmit}>
                                {isLoadingStepData && (
                                    <LoadingState message={t("checkout.loadingPaymentProviders")} />
                                )}

                                {!isLoadingStepData && paymentProviders.length === 0 && (
                                    <Text>{t("checkout.noPaymentProviders")}</Text>
                                )}

                                {!isLoadingStepData && paymentProviders.length > 0 && (
                                    <Styled.RadioList>
                                        {paymentProviders.map((provider) => (
                                            <Styled.RadioCard key={provider.id}>
                                                <Styled.RadioContent>
                                                    <Styled.RadioInput
                                                        type="radio"
                                                        name="payment-provider"
                                                        value={provider.id}
                                                        checked={selectedProviderId === provider.id}
                                                        onChange={() =>
                                                            setSelectedProviderId(provider.id)
                                                        }
                                                    />
                                                    <Styled.RadioIndicator aria-hidden="true" />
                                                    <Styled.RadioName>
                                                        {t(
                                                            PAYMENT_PROVIDER_LABEL_KEYS[provider.id] ||
                                                                provider.id,
                                                            { defaultValue: provider.id }
                                                        )}
                                                    </Styled.RadioName>
                                                </Styled.RadioContent>
                                            </Styled.RadioCard>
                                        ))}
                                    </Styled.RadioList>
                                )}

                                <Styled.StepActions>
                                    <Button
                                        type="button"
                                        size="s"
                                        appearance="ghost"
                                        onClick={() => goToStep(STEP.SHIPPING)}
                                    >
                                        {t("checkout.back")}
                                    </Button>
                                    <Styled.ContinueButton
                                        type="submit"
                                        size="s"
                                        disabled={isSubmittingStep || !selectedProviderId}
                                    >
                                        {t("checkout.continue")}
                                    </Styled.ContinueButton>
                                </Styled.StepActions>
                            </Styled.Form>
                        )}

                        {stepIndex === STEP.REVIEW && (
                            <>
                                <Styled.ReviewBlock>
                                    <Styled.ReviewBlockHeader>
                                        <Label as="p">{t("checkout.steps.contact")}</Label>
                                        <Styled.EditLink
                                            type="button"
                                            appearance="ghost"
                                            size="xs"
                                            onClick={() => goToStep(STEP.CONTACT)}
                                        >
                                            {t("checkout.editStep")}
                                        </Styled.EditLink>
                                    </Styled.ReviewBlockHeader>
                                    <Styled.ReviewText>
                                        {contactForm.email}
                                        <br />
                                        {contactForm.first_name} {contactForm.last_name}
                                        {contactForm.phone ? <br /> : null}
                                        {contactForm.phone}
                                    </Styled.ReviewText>
                                </Styled.ReviewBlock>

                                <Styled.ReviewBlock>
                                    <Styled.ReviewBlockHeader>
                                        <Label as="p">{t("checkout.steps.shipping")}</Label>
                                        <Styled.EditLink
                                            type="button"
                                            appearance="ghost"
                                            size="xs"
                                            onClick={() => goToStep(STEP.SHIPPING)}
                                        >
                                            {t("checkout.editStep")}
                                        </Styled.EditLink>
                                    </Styled.ReviewBlockHeader>
                                    <Styled.ReviewText>
                                        {shippingMethod
                                            ? `${shippingOptionName || ""} — ${readAmount(
                                                  shippingMethod.amount
                                              )} ${t("common.currency")}`
                                            : "—"}
                                        {shippingLocationDetail ? <br /> : null}
                                        {shippingLocationDetail}
                                    </Styled.ReviewText>
                                </Styled.ReviewBlock>

                                <Styled.ReviewBlock>
                                    <Styled.ReviewBlockHeader>
                                        <Label as="p">{t("checkout.steps.payment")}</Label>
                                        <Styled.EditLink
                                            type="button"
                                            appearance="ghost"
                                            size="xs"
                                            onClick={() => goToStep(STEP.PAYMENT)}
                                        >
                                            {t("checkout.editStep")}
                                        </Styled.EditLink>
                                    </Styled.ReviewBlockHeader>
                                    <Styled.ReviewText>
                                        {t(selectedProviderLabelKey || selectedProviderId, {
                                            defaultValue: selectedProviderId,
                                        })}
                                    </Styled.ReviewText>
                                </Styled.ReviewBlock>

                                <Styled.StepActions>
                                    <span />
                                    <Styled.ContinueButton
                                        type="button"
                                        size="s"
                                        onClick={handlePlaceOrder}
                                        disabled={isPlacingOrder}
                                    >
                                        {isPlacingOrder
                                            ? t("checkout.placingOrder")
                                            : t("checkout.placeOrder")}
                                    </Styled.ContinueButton>
                                </Styled.StepActions>
                            </>
                        )}
                    </Styled.Main>

                    <Styled.Summary>
                        <Styled.SummaryTitle>{t("checkout.orderSummary")}</Styled.SummaryTitle>

                        <Styled.SummaryItems>
                            {items.map((item) => (
                                <ModalProductItem
                                    key={item.lineId}
                                    image={item.image}
                                    name={item.name}
                                    price={item.price}
                                    details={
                                        <Styled.Muted>
                                            {item.optionsLabel ? `${item.optionsLabel} · ` : ""}×
                                            {item.quantity}
                                        </Styled.Muted>
                                    }
                                />
                            ))}
                        </Styled.SummaryItems>

                        <Styled.PromoSection>
                            {cartPromotions.map((promotion) => (
                                <Styled.PromoTag key={promotion.id}>
                                    <Styled.PromoCode>{promotion.code}</Styled.PromoCode>
                                    <Styled.PromoRemoveButton
                                        type="button"
                                        icon={trashIcon}
                                        iconSize="14px"
                                        size="xs"
                                        appearance="ghost"
                                        ariaLabel={t("checkout.promo.remove")}
                                        onClick={() => handleRemovePromo(promotion.code)}
                                    />
                                </Styled.PromoTag>
                            ))}

                            <Styled.PromoForm onSubmit={handleApplyPromo}>
                                <InputField
                                    value={promoCode}
                                    onChange={(event) => setPromoCode(event.target.value)}
                                    placeholder={t("checkout.promo.placeholder")}
                                    aria-label={t("checkout.promo.label")}
                                />
                                <Styled.PromoApplyButton
                                    type="submit"
                                    size="xs"
                                    icon={arrowRightIcon}
                                    ariaLabel={
                                        isApplyingPromo
                                            ? t("checkout.promo.applying")
                                            : t("checkout.promo.apply")
                                    }
                                    disabled={isApplyingPromo || !promoCode.trim()}
                                />
                            </Styled.PromoForm>

                            {promoError && <Styled.ErrorText>{promoError}</Styled.ErrorText>}
                        </Styled.PromoSection>

                        <Styled.SummaryRow>
                            <Styled.Muted>{t("checkout.subtotal")}</Styled.Muted>
                            <span>
                                {itemsSubtotal} {t("common.currency")}
                            </span>
                        </Styled.SummaryRow>

                        {discountTotal > 0 && (
                            <Styled.SummaryRow>
                                <Styled.Muted>{t("checkout.promo.discount")}</Styled.Muted>
                                <span>
                                    -{discountTotal} {t("common.currency")}
                                </span>
                            </Styled.SummaryRow>
                        )}

                        {shippingMethod && (
                            <Styled.SummaryRow>
                                <Styled.Muted>{t("checkout.shippingCost")}</Styled.Muted>
                                <span>
                                    {readAmount(shippingMethod.amount)} {t("common.currency")}
                                </span>
                            </Styled.SummaryRow>
                        )}

                        <Styled.SummaryTotalRow>
                            <span>{t("checkout.total")}</span>
                            <span>
                                {grandTotal} {t("common.currency")}
                            </span>
                        </Styled.SummaryTotalRow>
                    </Styled.Summary>
                </Styled.Layout>
            </Container>
        </section>
    );
};

export default CheckoutPage;
