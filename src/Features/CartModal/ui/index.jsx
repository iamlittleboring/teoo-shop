import { CartItem } from "@entities/CartItem";
import { useCart } from "@shared/lib";
import LoadingState from "@shared/ui/LoadingState";
import Modal from "@shared/ui/Modal";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Styled from "./styled";

const CartModal = ({ isOpen, onClose }) => {
    const { clearCart, error, isLoading, items, removeItem, setItemQuantity, totalPrice } =
        useCart();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleCheckout = () => {
        onClose();
        navigate("/checkout");
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Styled.Container>
                <Styled.Title>{t("cart.title")}</Styled.Title>
                {isLoading && <LoadingState message={t("common.loading")} />}
                {error && <Styled.StatusMessage $tone="error">{error}</Styled.StatusMessage>}
                {!isLoading && items.length === 0 && (
                    <Styled.EmptyState>
                        <Styled.StatusMessage>{t("cart.empty")}</Styled.StatusMessage>
                    </Styled.EmptyState>
                )}
                {items.length > 0 && (
                    <Styled.Items>
                        {items.map((item) => (
                            <CartItem
                                key={item.lineId}
                                image={item.image}
                                name={item.name}
                                options={item.options}
                                price={item.price}
                                count={item.quantity}
                                setCount={(count) => setItemQuantity(item.lineId, count)}
                                onRemove={() => removeItem(item.lineId)}
                            />
                        ))}
                    </Styled.Items>
                )}
                {items.length > 0 && (
                    <Styled.FooterBlock>
                        <Styled.Footer>
                            <Styled.Total>
                                {t("cart.total")} {totalPrice}{" "}
                                <Styled.Currency>{t("common.currency")}</Styled.Currency>
                            </Styled.Total>
                            <Styled.ClearButton
                                type="button"
                                onClick={clearCart}
                                size="xs"
                                appearance="danger-outline"
                            >
                                {t("cart.clear")}
                            </Styled.ClearButton>
                        </Styled.Footer>
                        <Styled.CheckoutButton
                            type="button"
                            size="s"
                            onClick={handleCheckout}
                        >
                            {t("cart.checkout")}
                        </Styled.CheckoutButton>
                    </Styled.FooterBlock>
                )}
            </Styled.Container>
        </Modal>
    );
};

export default CartModal;
