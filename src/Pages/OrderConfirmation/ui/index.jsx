import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import { readAmount } from "@shared/lib";
import { Container, Text } from "@shared/styles";
import Button from "@shared/ui/Button";
import ModalProductItem from "@shared/ui/ModalProductItem";
import SectionTitle from "@shared/ui/SectionTitle";

import { mapOrderItem } from "../lib/map-order-item";
import Styled from "./styled";

const OrderConfirmationPage = () => {
    const { t } = useTranslation();
    const { state } = useLocation();
    const order = state?.order;

    if (!order) {
        return (
            <section>
                <Container>
                    <Styled.Missing>
                        <SectionTitle>{t("confirmation.title")}</SectionTitle>
                        <Text>{t("confirmation.missing")}</Text>
                        <Button as={Link} to="/" size="s">
                            {t("confirmation.backHome")}
                        </Button>
                    </Styled.Missing>
                </Container>
            </section>
        );
    }

    const items = (order.items || []).map(mapOrderItem);
    // `order.subtotal` includes shipping, same as on the cart — use `item_total` for items-only.
    const subtotal = readAmount(order.item_total ?? order.subtotal);
    const shippingTotal = readAmount(order.shipping_total);
    const total = readAmount(order.total);

    return (
        <section>
            <Container>
                <Styled.Box>
                    <SectionTitle>{t("confirmation.title")}</SectionTitle>
                    <Styled.OrderNumber>
                        {t("confirmation.orderNumber", { number: order.display_id })}
                    </Styled.OrderNumber>
                    <Styled.Subtitle>
                        {t("confirmation.subtitle", { email: order.email })}
                    </Styled.Subtitle>
                </Styled.Box>

                <Styled.Layout>
                    <div>
                        <SectionTitle>{t("confirmation.itemsTitle")}</SectionTitle>
                        <Styled.Items>
                            {items.map((item) => (
                                <ModalProductItem
                                    key={item.lineId}
                                    image={item.image}
                                    name={item.name}
                                    price={item.price}
                                    details={
                                        <Styled.Muted>
                                            {item.size ? `${item.size} · ` : ""}×{item.quantity}
                                        </Styled.Muted>
                                    }
                                />
                            ))}
                        </Styled.Items>
                    </div>

                    <Styled.Summary>
                        <Styled.SummaryTitle>{t("checkout.orderSummary")}</Styled.SummaryTitle>

                        <Styled.SummaryRow>
                            <Styled.Muted>{t("checkout.subtotal")}</Styled.Muted>
                            <span>
                                {subtotal} {t("common.currency")}
                            </span>
                        </Styled.SummaryRow>

                        <Styled.SummaryRow>
                            <Styled.Muted>{t("checkout.shippingCost")}</Styled.Muted>
                            <span>
                                {shippingTotal} {t("common.currency")}
                            </span>
                        </Styled.SummaryRow>

                        <Styled.SummaryTotalRow>
                            <span>{t("checkout.total")}</span>
                            <span>
                                {total} {t("common.currency")}
                            </span>
                        </Styled.SummaryTotalRow>

                        <Button as={Link} to="/" size="s">
                            {t("confirmation.continueShopping")}
                        </Button>
                    </Styled.Summary>
                </Styled.Layout>
            </Container>
        </section>
    );
};

export default OrderConfirmationPage;
