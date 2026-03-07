import { CartItem } from "@entities/CartItem";
import { SubTitle, Text } from "@shared/styles";
import Modal from "@shared/ui/Modal";
import { useCart } from "@shared/lib";
import { useTranslation } from "react-i18next";

import Styled from "./styled";

const CartModal = ({ isOpen, onClose }) => {
    const { clearCart, items, removeItem, setItemQuantity, totalPrice } = useCart();
    const { t } = useTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t("cart.title")}>
            <Styled.Container>
                <SubTitle $color="inherit">{t("cart.title")}</SubTitle>
                {items.length === 0 && <Text>{t("cart.empty")}</Text>}
                {items.length > 0 && (
                    <Styled.Items>
                        {items.map((item) => (
                            <CartItem
                                key={item.key}
                                image={item.image}
                                name={item.name}
                                color={item.color}
                                size={item.size}
                                price={item.price}
                                count={item.quantity}
                                setCount={(count) => setItemQuantity(item.key, count)}
                                onRemove={() => removeItem(item.key)}
                            />
                        ))}
                    </Styled.Items>
                )}
                {items.length > 0 && (
                    <Styled.Footer>
                        <Styled.Total>
                            {t("cart.total")} {totalPrice}{" "}
                            <Styled.Currency>{t("common.currency")}</Styled.Currency>
                        </Styled.Total>
                        <Styled.ClearButton type="button" onClick={clearCart}>
                            {t("cart.clear")}
                        </Styled.ClearButton>
                    </Styled.Footer>
                )}
            </Styled.Container>
        </Modal>
    );
};

export default CartModal;
