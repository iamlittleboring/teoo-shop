import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { NovaPoshtaLocationPicker } from "@entities/NovaPoshtaLocation";
import {
    confirmPasswordReset,
    getCustomerOrders,
    requestPasswordReset,
    updateCustomerProfile,
    updateFormByEvent,
    useAuth,
    useCart,
    verifyEmail,
} from "@shared/lib";
import { Name, Meta, Price } from "@shared/styles/panel-list";
import Button from "@shared/ui/Button";
import LoadingState from "@shared/ui/LoadingState";
import Modal from "@shared/ui/Modal";
import ModalProductItem from "@shared/ui/ModalProductItem";

import google from "@shared/assets/images/google.svg";
import eye from "../assets/eye.svg";
import help from "../assets/help.svg";

import Styled from "./styled";

import { formatErrorText } from "../lib/format-error-text";
import {
    ORDERS_PAGE_SIZE,
    VIEWSTATE,
    loginState,
    registerState,
    resetState,
    resetConfirmState,
} from "../config";

const StatusBanner = ({ status }) =>
    status ? (
        <Styled.StatusMessage $tone={status.tone}>{status.text}</Styled.StatusMessage>
    ) : null;

const EmailField = ({ id, onChange, t, value }) => (
    <Styled.Field>
        <Styled.Label htmlFor={id}>{t("account.emailLabel")}</Styled.Label>
        <Styled.InputField
            id={id}
            name="email"
            type="email"
            value={value}
            onChange={onChange}
            placeholder={t("account.emailPlaceholder")}
            autoComplete="email"
            required
        />
    </Styled.Field>
);

const PasswordField = ({
    autoComplete,
    extraAction,
    id,
    isVisible,
    label,
    name = "password",
    onChange,
    onToggleVisible,
    placeholder,
    t,
    value,
}) => {
    const field = (
        <Styled.Field>
            <Styled.Label htmlFor={id}>{label}</Styled.Label>
            <Styled.InputField
                id={id}
                name={name}
                type={onToggleVisible && isVisible ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required
            />
        </Styled.Field>
    );

    if (!onToggleVisible) {
        return field;
    }

    return (
        <Styled.PasswordRow>
            {field}
            <Styled.ActionGroup>
                <Button
                    icon={eye}
                    size="s"
                    type="button"
                    onClick={onToggleVisible}
                    ariaLabel={t("account.actions.showPassword")}
                />
                {extraAction}
            </Styled.ActionGroup>
        </Styled.PasswordRow>
    );
};

const profileFromCustomer = (customer) => ({
    first_name: customer?.first_name || "",
    last_name: customer?.last_name || "",
    phone: customer?.phone || "",
});

const ProfileForm = ({ customer, refreshCustomer, t }) => {
    const [form, setForm] = useState(() => profileFromCustomer(customer));
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        setForm(profileFromCustomer(customer));
    }, [customer]);

    const handleChange = updateFormByEvent(setForm);
    const isDirty =
        JSON.stringify(form) !== JSON.stringify(profileFromCustomer(customer));

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSaving || !isDirty) return;

        setIsSaving(true);
        setStatus(null);

        try {
            await updateCustomerProfile(form);
            await refreshCustomer();
            setStatus({ tone: "success", text: t("account.profile.saved") });
        } catch {
            setStatus({ tone: "error", text: t("account.profile.error") });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Styled.SubSection>
            <Styled.Form onSubmit={handleSubmit}>
                <StatusBanner status={status} />

                <Styled.FieldsGrid>
                    <Styled.Field>
                        <Styled.Label htmlFor="profile-first-name">
                            {t("checkout.fields.firstName")}
                        </Styled.Label>
                        <Styled.InputField
                            id="profile-first-name"
                            name="first_name"
                            value={form.first_name}
                            onChange={handleChange}
                            autoComplete="given-name"
                        />
                    </Styled.Field>
                    <Styled.Field>
                        <Styled.Label htmlFor="profile-last-name">
                            {t("checkout.fields.lastName")}
                        </Styled.Label>
                        <Styled.InputField
                            id="profile-last-name"
                            name="last_name"
                            value={form.last_name}
                            onChange={handleChange}
                            autoComplete="family-name"
                        />
                    </Styled.Field>
                </Styled.FieldsGrid>

                <Styled.Field>
                    <Styled.Label htmlFor="profile-phone">
                        {t("checkout.fields.phone")}
                    </Styled.Label>
                    <Styled.InputField
                        id="profile-phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                    />
                </Styled.Field>

                {isDirty && (
                    <Styled.TextActionButton
                        type="submit"
                        size="xs"
                        appearance="ghost"
                        disabled={isSaving}
                    >
                        {t("account.profile.save")}
                    </Styled.TextActionButton>
                )}
            </Styled.Form>
        </Styled.SubSection>
    );
};

// Emails default to on (missing preference === enabled) — this only ever
// stores an explicit `false` once someone opts out, matching how the
// backend jobs read the same flag (`wantsMarketingEmails`).
const MarketingPreference = ({ customer, refreshCustomer, t }) => {
    const [isSaving, setIsSaving] = useState(false);
    const enabled = customer?.metadata?.marketing_emails_enabled !== false;

    const handleChange = async (event) => {
        const checked = event.target.checked;

        setIsSaving(true);

        await updateCustomerProfile({
            metadata: { ...customer?.metadata, marketing_emails_enabled: checked },
        }).catch(() => {});

        await refreshCustomer();
        setIsSaving(false);
    };

    return (
        <Styled.SubSection>
            <Styled.CheckboxLabel>
                <Styled.CheckboxInput
                    type="checkbox"
                    checked={enabled}
                    onChange={handleChange}
                    disabled={isSaving}
                />
                <Styled.CheckboxBox aria-hidden="true" />
                {t("account.marketingEmails.label")}
            </Styled.CheckboxLabel>
        </Styled.SubSection>
    );
};

// Wraps the shared Nova Poshta picker (same one Checkout uses) with the one
// thing that's specific to "favorite branch": save the pick to the
// customer's profile instead of an in-progress cart.
const FavoriteWarehouse = ({ customer, refreshCustomer, t }) => {
    const saved = customer?.metadata?.favoriteWarehouse || null;

    const [isEditing, setIsEditing] = useState(false);
    const [draftLocation, setDraftLocation] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState(null);

    const startEdit = () => {
        setIsEditing(true);
        setDraftLocation(null);
        setStatus(null);
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setStatus(null);
    };

    const handleSave = async (event) => {
        event.preventDefault();

        if (isSaving || !draftLocation) return;

        setIsSaving(true);
        setStatus(null);

        try {
            await updateCustomerProfile({
                metadata: {
                    ...customer?.metadata,
                    favoriteWarehouse: {
                        cityRef: draftLocation.npCityRef,
                        cityName: draftLocation.npCityName,
                        warehouseRef: draftLocation.npWarehouseRef,
                        warehouseDescription: draftLocation.npWarehouseDescription,
                    },
                },
            });
            await refreshCustomer();
            setIsEditing(false);
        } catch {
            setStatus({ tone: "error", text: t("account.favoriteWarehouse.error") });
        } finally {
            setIsSaving(false);
        }
    };

    const handleRemove = async () => {
        await updateCustomerProfile({
            metadata: { ...customer?.metadata, favoriteWarehouse: null },
        }).catch(() => {});
        await refreshCustomer();
    };

    if (!isEditing) {
        return (
            <Styled.SubSection>
                {saved && (
                    <Styled.AddressCard>
                        <div>
                            <Styled.AddressName>{saved.cityName}</Styled.AddressName>
                            <Styled.AddressLine>{saved.warehouseDescription}</Styled.AddressLine>
                        </div>
                        <Styled.AddressActions>
                            <Styled.TextActionButton
                                type="button"
                                size="xs"
                                appearance="danger-link"
                                onClick={handleRemove}
                            >
                                {t("account.favoriteWarehouse.remove")}
                            </Styled.TextActionButton>
                        </Styled.AddressActions>
                    </Styled.AddressCard>
                )}

                {!saved && (
                    <Styled.TextActionButton
                        type="button"
                        size="xs"
                        appearance="ghost"
                        onClick={startEdit}
                    >
                        {t("account.favoriteWarehouse.add")}
                    </Styled.TextActionButton>
                )}
            </Styled.SubSection>
        );
    }

    return (
        <Styled.SubSection>
            <Styled.Form onSubmit={handleSave}>
                <StatusBanner status={status} />

                <NovaPoshtaLocationPicker
                    locationType="warehouse"
                    onSelect={setDraftLocation}
                    t={t}
                />

                <Styled.ActionGroup>
                    <Styled.TextActionButton
                        type="submit"
                        size="xs"
                        appearance="ghost"
                        disabled={isSaving || !draftLocation}
                    >
                        {t("account.favoriteWarehouse.save")}
                    </Styled.TextActionButton>
                    <Styled.TextActionButton
                        type="button"
                        size="xs"
                        appearance="ghost"
                        onClick={cancelEdit}
                        disabled={isSaving}
                    >
                        {t("account.favoriteWarehouse.cancel")}
                    </Styled.TextActionButton>
                </Styled.ActionGroup>
            </Styled.Form>
        </Styled.SubSection>
    );
};

const formatOrderDate = (value, locale) => {
    if (!value) return "";

    try {
        return new Intl.DateTimeFormat(locale, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(new Date(value));
    } catch {
        return "";
    }
};

const OrderHistory = ({ t }) => {
    const { i18n } = useTranslation();
    const [orders, setOrders] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedId, setExpandedId] = useState(null);

    const loadPage = async (offset) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await getCustomerOrders({ limit: ORDERS_PAGE_SIZE, offset });
            setOrders((prev) => (offset === 0 ? response.orders : [...prev, ...response.orders]));
            setCount(response.count);
        } catch {
            setError(t("account.orders.error"));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadPage(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading && orders.length === 0) {
        return (
            <Styled.SubSection>
                <Styled.PanelTitle>{t("account.orders.title")}</Styled.PanelTitle>
                <LoadingState message={t("account.orders.loading")} />
            </Styled.SubSection>
        );
    }

    if (error && orders.length === 0) {
        return (
            <Styled.SubSection>
                <Styled.PanelTitle>{t("account.orders.title")}</Styled.PanelTitle>
                <Styled.StatusMessage $tone="error">{error}</Styled.StatusMessage>
            </Styled.SubSection>
        );
    }

    if (orders.length === 0) {
        return (
            <Styled.SubSection>
                <Styled.PanelTitle>{t("account.orders.title")}</Styled.PanelTitle>
                <Styled.StatusMessage>{t("account.orders.empty")}</Styled.StatusMessage>
            </Styled.SubSection>
        );
    }

    return (
        <Styled.SubSection>
            <Styled.PanelTitle>{t("account.orders.title")}</Styled.PanelTitle>

            <Styled.OrderList>
                {orders.map((order) => {
                    const isExpanded = expandedId === order.id;

                    return (
                        <Styled.OrderCard key={order.id}>
                            <Styled.OrderRow
                                type="button"
                                onClick={() => setExpandedId(isExpanded ? null : order.id)}
                                aria-expanded={isExpanded}
                            >
                                <div>
                                    <Name>
                                        {t("account.orders.orderNumber", {
                                            number: order.displayId,
                                        })}
                                    </Name>
                                    <Meta>
                                        {formatOrderDate(order.createdAt, i18n.language)}
                                        {" · "}
                                        {t("account.orders.items", { count: order.items.length })}
                                    </Meta>
                                </div>
                                <Styled.OrderRowEnd>
                                    <Styled.OrderStatusBadge>
                                        {t(
                                            `account.orders.fulfillmentStatus.${order.fulfillmentStatus}`
                                        )}
                                    </Styled.OrderStatusBadge>
                                    <Price>
                                        {order.total} {order.currencyCode.toUpperCase()}
                                    </Price>
                                </Styled.OrderRowEnd>
                            </Styled.OrderRow>

                            {isExpanded && (
                                <Styled.OrderItems>
                                    {order.items.map((item) => (
                                        <ModalProductItem
                                            key={item.id}
                                            image={item.image}
                                            name={item.name}
                                            price={item.price}
                                            details={
                                                <Meta>
                                                    {item.size ? `${item.size} · ` : ""}×
                                                    {item.quantity}
                                                </Meta>
                                            }
                                        />
                                    ))}
                                    <Meta>
                                        {t(`account.orders.paymentStatus.${order.paymentStatus}`)}
                                    </Meta>
                                </Styled.OrderItems>
                            )}
                        </Styled.OrderCard>
                    );
                })}
            </Styled.OrderList>

            {orders.length < count && (
                <Styled.TextActionButton
                    type="button"
                    size="xs"
                    appearance="ghost"
                    onClick={() => loadPage(orders.length)}
                    disabled={isLoading}
                >
                    {t("account.orders.loadMore")}
                </Styled.TextActionButton>
            )}
        </Styled.SubSection>
    );
};

const AccountModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const {
        customer,
        deleteAccount,
        isAuthenticated,
        isLoading: isAuthLoading,
        login,
        loginWithGoogle,
        loginWithGoogleCallback,
        logout,
        refreshCustomer,
        register,
    } = useAuth();
    const { resetCart } = useCart();

    const [view, setView] = useState(VIEWSTATE.LOGIN);
    const [status, setStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [verifyState, setVerifyState] = useState(null);
    const [googleState, setGoogleState] = useState(null);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Both flows below exchange a one-time code/token from the URL. Gating
    // on state (verifyState/googleState) isn't enough — StrictMode's dev-mode
    // double-invoke runs the effect twice before the first setState is
    // visible, firing the exchange twice with the same code. Refs update
    // synchronously, so they actually block the second run.
    const hasHandledVerifyEmailRef = useRef(false);
    const hasHandledGoogleCallbackRef = useRef(false);

    const [loginForm, setLoginForm] = useState(loginState);
    const [registerForm, setRegisterForm] = useState(registerState);
    const [resetForm, setResetForm] = useState(resetState);
    const [resetConfirmForm, setResetConfirmForm] = useState(resetConfirmState);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isRegisterPasswordVisible, setIsRegisterPasswordVisible] =
        useState(false);
    const [
        isRegisterRepeatPasswordVisible,
        setIsRegisterRepeatPasswordVisible,
    ] = useState(false);

    const handleLoginChange = updateFormByEvent(setLoginForm);
    const handleRegisterChange = updateFormByEvent(setRegisterForm);
    const handleResetChange = updateFormByEvent(setResetForm);
    const handleResetConfirmChange = updateFormByEvent(setResetConfirmForm);

    const resetVisibility = () => {
        setIsPasswordVisible(false);
        setIsRegisterPasswordVisible(false);
        setIsRegisterRepeatPasswordVisible(false);
    };

    const handleViewChange = (nextView) => {
        setView(nextView);
        resetVisibility();
        setStatus(null);
    };

    useEffect(() => {
        if (isOpen) {
            return;
        }

        setView(VIEWSTATE.LOGIN);
        resetVisibility();
        setStatus(null);
        setVerifyState(null);
        setGoogleState(null);
        setIsConfirmingDelete(false);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        if (searchParams.get("reset-password") !== "confirm") {
            return;
        }

        const token = searchParams.get("token") || "";
        const email = searchParams.get("email") || "";

        setView(VIEWSTATE.RESET_PASSWORD_CONFIRM);

        setResetConfirmForm((prev) => ({
            ...prev,
            email: email || prev.email,
            token: token || prev.token,
        }));
    }, [isOpen, searchParams]);

    useEffect(() => {
        if (!isOpen) return;
        if (hasHandledVerifyEmailRef.current) return;
        if (searchParams.get("verify-email") !== "confirm") return;

        hasHandledVerifyEmailRef.current = true;

        const token = searchParams.get("token") || "";
        const email = searchParams.get("email") || "";

        setView(VIEWSTATE.VERIFY_EMAIL);
        setVerifyState({ phase: "pending" });

        verifyEmail({ email, token })
            .then(() => {
                setVerifyState({ phase: "success" });
                return refreshCustomer();
            })
            .catch((error) => {
                setVerifyState({
                    phase: "error",
                    message: formatErrorText(t, "account.messages.verifyEmailError", error),
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, searchParams]);

    useEffect(() => {
        if (!isOpen) return;
        if (hasHandledGoogleCallbackRef.current) return;
        if (searchParams.get("google_return") !== "1") return;

        hasHandledGoogleCallbackRef.current = true;

        const code = searchParams.get("code") || "";
        const state = searchParams.get("state") || "";

        setView(VIEWSTATE.GOOGLE_CALLBACK);
        setGoogleState({ phase: "pending" });

        loginWithGoogleCallback({ code, state })
            .then(() => {
                setGoogleState(null);
                handleViewChange(VIEWSTATE.LOGIN);
            })
            .catch((error) => {
                setGoogleState({
                    phase: "error",
                    message: formatErrorText(t, "account.messages.googleError", error),
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, searchParams]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSubmitting) return;

        setStatus(null);
        setIsSubmitting(true);

        try {
            await login(loginForm);
            setLoginForm(loginState);
        } catch (error) {
            setStatus({
                tone: "error",
                text: formatErrorText(t, "account.messages.loginError", error),
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        if (isSubmitting) return;

        if (registerForm.password !== registerForm.repeatPassword) {
            setStatus({ tone: "error", text: t("account.messages.passwordMismatch") });
            return;
        }

        setStatus(null);
        setIsSubmitting(true);

        try {
            await register({
                email: registerForm.email,
                password: registerForm.password,
            });
            setRegisterForm(registerState);
        } catch (error) {
            const message = error?.message || "";

            if (message.toLowerCase().includes("already")) {
                handleViewChange(VIEWSTATE.LOGIN);
                setLoginForm((prev) => ({ ...prev, email: registerForm.email }));
                setStatus({
                    tone: "error",
                    text: t("account.messages.registerAlreadyExists"),
                });
            } else {
                setStatus({
                    tone: "error",
                    text: formatErrorText(t, "account.messages.registerError", error),
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResetPasswordSubmit = async (event) => {
        event.preventDefault();

        if (isSubmitting) return;

        setStatus(null);
        setIsSubmitting(true);

        try {
            await requestPasswordReset(resetForm.email);
            setStatus({
                tone: "success",
                text: t("account.messages.resetPasswordSuccess"),
            });
        } catch (error) {
            setStatus({
                tone: "error",
                text: formatErrorText(t, "account.messages.resetPasswordError", error),
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResetPasswordConfirmSubmit = async (event) => {
        event.preventDefault();

        if (isSubmitting) return;

        if (resetConfirmForm.password !== resetConfirmForm.repeatPassword) {
            setStatus({ tone: "error", text: t("account.messages.passwordMismatch") });
            return;
        }

        setStatus(null);
        setIsSubmitting(true);

        try {
            await confirmPasswordReset({
                email: resetConfirmForm.email,
                token: resetConfirmForm.token,
                password: resetConfirmForm.password,
            });
            const email = resetConfirmForm.email;
            setResetConfirmForm(resetConfirmState);
            handleViewChange(VIEWSTATE.LOGIN);
            setLoginForm((prev) => ({ ...prev, email }));
        } catch (error) {
            setStatus({
                tone: "error",
                text: formatErrorText(t, "account.messages.resetPasswordError", error),
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleLogin = async () => {
        setStatus(null);

        try {
            await loginWithGoogle();
        } catch (error) {
            setStatus({
                tone: "error",
                text: formatErrorText(t, "account.messages.googleError", error),
            });
        }
    };

    const handleLogout = async () => {
        if (isLoggingOut) return;

        setIsLoggingOut(true);
        setStatus(null);

        try {
            await logout();
            resetCart();
        } catch {
            setStatus({ tone: "error", text: t("account.messages.logoutError") });
        } finally {
            setIsLoggingOut(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (isDeleting) return;

        setIsDeleting(true);
        setStatus(null);

        try {
            await deleteAccount();
            resetCart();
        } catch (error) {
            setIsConfirmingDelete(false);
            setStatus({
                tone: "error",
                text: formatErrorText(t, "account.messages.deleteAccountError", error),
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <Modal
                isOpen={
                    isOpen &&
                    isAuthLoading &&
                    view !== VIEWSTATE.VERIFY_EMAIL &&
                    view !== VIEWSTATE.GOOGLE_CALLBACK
                }
                onClose={onClose}
            >
                <Styled.Container>
                    <LoadingState message={t("account.messages.loading")} />
                </Styled.Container>
            </Modal>

            <Modal
                isOpen={isOpen && view === VIEWSTATE.VERIFY_EMAIL}
                onClose={onClose}
            >
                <Styled.Container>
                    {verifyState?.phase === "pending" && (
                        <LoadingState message={t("account.messages.verifyEmailPending")} />
                    )}
                    {verifyState?.phase === "success" && (
                        <Styled.StatusMessage $tone="success">
                            {t("account.messages.verifyEmailSuccess")}
                        </Styled.StatusMessage>
                    )}
                    {verifyState?.phase === "error" && (
                        <Styled.StatusMessage $tone="error">
                            {verifyState.message}
                        </Styled.StatusMessage>
                    )}
                </Styled.Container>
            </Modal>

            <Modal
                isOpen={isOpen && view === VIEWSTATE.GOOGLE_CALLBACK}
                onClose={onClose}
            >
                <Styled.Container>
                    {googleState?.phase === "pending" && (
                        <LoadingState message={t("account.messages.googlePending")} />
                    )}
                    {googleState?.phase === "error" && (
                        <>
                            <Styled.StatusMessage $tone="error">
                                {googleState.message}
                            </Styled.StatusMessage>
                            <Styled.TextActionButton
                                type="button"
                                size="xs"
                                appearance="ghost"
                                onClick={() => handleViewChange(VIEWSTATE.LOGIN)}
                            >
                                {t("account.backToLogin")}
                            </Styled.TextActionButton>
                        </>
                    )}
                </Styled.Container>
            </Modal>

            <Modal
                isOpen={
                    isOpen &&
                    !isAuthLoading &&
                    isAuthenticated &&
                    view !== VIEWSTATE.VERIFY_EMAIL &&
                    view !== VIEWSTATE.GOOGLE_CALLBACK
                }
                onClose={onClose}
            >
                <Styled.Container>
                    <Styled.AccountEmail>{customer?.email}</Styled.AccountEmail>

                    <StatusBanner status={status} />

                    <ProfileForm customer={customer} refreshCustomer={refreshCustomer} t={t} />
                    <FavoriteWarehouse
                        customer={customer}
                        refreshCustomer={refreshCustomer}
                        t={t}
                    />

                    <OrderHistory t={t} />

                    <MarketingPreference
                        customer={customer}
                        refreshCustomer={refreshCustomer}
                        t={t}
                    />

                    <Styled.PrimaryButton
                        type="button"
                        size="s"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                    >
                        {t("account.logoutSubmit")}
                    </Styled.PrimaryButton>

                    {!isConfirmingDelete && (
                        <Styled.TextActionButton
                            type="button"
                            size="xs"
                            appearance="danger-outline"
                            onClick={() => setIsConfirmingDelete(true)}
                        >
                            {t("account.deleteAccountSubmit")}
                        </Styled.TextActionButton>
                    )}

                    {isConfirmingDelete && (
                        <>
                            <Styled.PrimaryButton
                                type="button"
                                size="s"
                                appearance="danger-outline"
                                onClick={handleDeleteAccount}
                                disabled={isDeleting}
                            >
                                {t("account.deleteAccountConfirmSubmit")}
                            </Styled.PrimaryButton>
                            <Styled.TextActionButton
                                type="button"
                                size="xs"
                                appearance="ghost"
                                onClick={() => setIsConfirmingDelete(false)}
                                disabled={isDeleting}
                            >
                                {t("account.deleteAccountCancel")}
                            </Styled.TextActionButton>
                        </>
                    )}
                </Styled.Container>
            </Modal>

            {!isAuthLoading && !isAuthenticated && (
                <>
                    <Modal
                        isOpen={isOpen && view === VIEWSTATE.LOGIN}
                        onClose={onClose}
                    >
                        <Styled.Container>
                            <Styled.Form onSubmit={handleSubmit}>
                                <StatusBanner status={status} />

                                <EmailField
                                    id="account-email"
                                    value={loginForm.email}
                                    onChange={handleLoginChange}
                                    t={t}
                                />

                                <PasswordField
                                    id="account-password"
                                    label={t("account.passwordLabel")}
                                    placeholder={t("account.passwordPlaceholder")}
                                    autoComplete="current-password"
                                    value={loginForm.password}
                                    onChange={handleLoginChange}
                                    isVisible={isPasswordVisible}
                                    onToggleVisible={() =>
                                        setIsPasswordVisible((prev) => !prev)
                                    }
                                    t={t}
                                    extraAction={
                                        <Button
                                            icon={help}
                                            size="s"
                                            type="button"
                                            onClick={() =>
                                                handleViewChange(VIEWSTATE.RESET_PASSWORD)
                                            }
                                            ariaLabel={t("account.forgotPassword")}
                                        />
                                    }
                                />

                                <Styled.PrimaryButton
                                    type="submit"
                                    size="s"
                                    disabled={isSubmitting}
                                >
                                    {t("account.submit")}
                                </Styled.PrimaryButton>

                                <Styled.TextActionButton
                                    type="button"
                                    size="xs"
                                    appearance="ghost"
                                    onClick={() => handleViewChange(VIEWSTATE.REGISTER)}
                                >
                                    {t("account.registerSubmit")}
                                </Styled.TextActionButton>
                            </Styled.Form>

                            <Styled.Divider>
                                <span>{t("account.divider")}</span>
                            </Styled.Divider>

                            <Styled.PrimaryButton
                                type="button"
                                size="s"
                                icon={google}
                                onClick={handleGoogleLogin}
                            >
                                {t("account.continueWithGoogle")}
                            </Styled.PrimaryButton>
                        </Styled.Container>
                    </Modal>

                    <Modal
                        isOpen={isOpen && view === VIEWSTATE.REGISTER}
                        onClose={onClose}
                    >
                        <Styled.Container>
                            <Styled.Form onSubmit={handleRegisterSubmit}>
                                <StatusBanner status={status} />

                                <EmailField
                                    id="register-email"
                                    value={registerForm.email}
                                    onChange={handleRegisterChange}
                                    t={t}
                                />

                                <PasswordField
                                    id="register-password"
                                    label={t("account.passwordLabel")}
                                    placeholder={t("account.passwordPlaceholder")}
                                    autoComplete="new-password"
                                    value={registerForm.password}
                                    onChange={handleRegisterChange}
                                    isVisible={isRegisterPasswordVisible}
                                    onToggleVisible={() =>
                                        setIsRegisterPasswordVisible((prev) => !prev)
                                    }
                                    t={t}
                                />

                                <PasswordField
                                    id="register-repeat-password"
                                    name="repeatPassword"
                                    label={t("account.repeatPasswordLabel")}
                                    placeholder={t("account.repeatPasswordPlaceholder")}
                                    autoComplete="new-password"
                                    value={registerForm.repeatPassword}
                                    onChange={handleRegisterChange}
                                    isVisible={isRegisterRepeatPasswordVisible}
                                    onToggleVisible={() =>
                                        setIsRegisterRepeatPasswordVisible((prev) => !prev)
                                    }
                                    t={t}
                                />

                                <Styled.PrimaryButton
                                    type="submit"
                                    size="s"
                                    disabled={isSubmitting}
                                >
                                    {t("account.registerSubmit")}
                                </Styled.PrimaryButton>

                                <Styled.TextActionButton
                                    type="button"
                                    size="xs"
                                    appearance="ghost"
                                    onClick={() => handleViewChange(VIEWSTATE.LOGIN)}
                                >
                                    {t("account.backToLogin")}
                                </Styled.TextActionButton>
                            </Styled.Form>

                            <Styled.Divider>
                                <span>{t("account.divider")}</span>
                            </Styled.Divider>

                            <Styled.PrimaryButton
                                type="button"
                                size="s"
                                appearance="ghost"
                                icon={google}
                                onClick={handleGoogleLogin}
                            >
                                {t("account.continueWithGoogle")}
                            </Styled.PrimaryButton>
                        </Styled.Container>
                    </Modal>

                    <Modal
                        isOpen={isOpen && view === VIEWSTATE.RESET_PASSWORD}
                        onClose={onClose}
                    >
                        <Styled.Container>
                            <Styled.Form onSubmit={handleResetPasswordSubmit}>
                                <StatusBanner status={status} />

                                <EmailField
                                    id="reset-email"
                                    value={resetForm.email}
                                    onChange={handleResetChange}
                                    t={t}
                                />

                                <Styled.PrimaryButton
                                    type="submit"
                                    size="s"
                                    disabled={isSubmitting}
                                >
                                    {t("account.resetPasswordSubmit")}
                                </Styled.PrimaryButton>

                                <Styled.TextActionButton
                                    type="button"
                                    size="xs"
                                    appearance="ghost"
                                    onClick={() => handleViewChange(VIEWSTATE.LOGIN)}
                                >
                                    {t("account.backToLogin")}
                                </Styled.TextActionButton>
                            </Styled.Form>
                        </Styled.Container>
                    </Modal>

                    <Modal
                        isOpen={isOpen && view === VIEWSTATE.RESET_PASSWORD_CONFIRM}
                        onClose={onClose}
                    >
                        <Styled.Container>
                            <Styled.Form onSubmit={handleResetPasswordConfirmSubmit}>
                                <StatusBanner status={status} />

                                <EmailField
                                    id="reset-confirm-email"
                                    value={resetConfirmForm.email}
                                    onChange={handleResetConfirmChange}
                                    t={t}
                                />

                                <PasswordField
                                    id="reset-confirm-password"
                                    label={t("account.resetPasswordNewLabel", {
                                        defaultValue: "New password",
                                    })}
                                    placeholder={t("account.resetPasswordNewPlaceholder", {
                                        defaultValue: "Enter a new password",
                                    })}
                                    autoComplete="new-password"
                                    value={resetConfirmForm.password}
                                    onChange={handleResetConfirmChange}
                                    t={t}
                                />

                                <PasswordField
                                    id="reset-confirm-repeat-password"
                                    name="repeatPassword"
                                    label={t("account.repeatPasswordLabel")}
                                    placeholder={t("account.repeatPasswordPlaceholder")}
                                    autoComplete="new-password"
                                    value={resetConfirmForm.repeatPassword}
                                    onChange={handleResetConfirmChange}
                                    t={t}
                                />

                                <Styled.PrimaryButton
                                    type="submit"
                                    size="s"
                                    disabled={isSubmitting}
                                >
                                    {t("account.resetPasswordConfirmSubmit", {
                                        defaultValue: "Change password",
                                    })}
                                </Styled.PrimaryButton>

                                <Styled.TextActionButton
                                    type="button"
                                    size="xs"
                                    appearance="ghost"
                                    onClick={() => handleViewChange(VIEWSTATE.LOGIN)}
                                >
                                    {t("account.backToLogin")}
                                </Styled.TextActionButton>
                            </Styled.Form>
                        </Styled.Container>
                    </Modal>
                </>
            )}
        </>
    );
};

export default AccountModal;
