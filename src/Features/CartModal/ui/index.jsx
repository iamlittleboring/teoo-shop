import CartItem from "@entities/CartItem/ui";
import { SubTitle, Text } from "@shared/styles";
import Modal from "@shared/ui/Modal";
import { useCart } from "@shared/lib";

import Styled from "./styled";

const CartModal = ({ isOpen, onClose }) => {
    const { clearCart, items, removeItem, setItemQuantity, totalPrice } = useCart();

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Your cart">
            <Styled.Container>
                <SubTitle $color="inherit">Cart</SubTitle>
                {items.length === 0 && <Text>Your cart is empty.</Text>}
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
                {items.length > 0 && (
                    <Styled.Footer>
                        <Styled.Total>Total: {totalPrice} грн</Styled.Total>
                        <Styled.ClearButton type="button" onClick={clearCart}>
                            Clear cart
                        </Styled.ClearButton>
                    </Styled.Footer>
                )}
            </Styled.Container>
        </Modal>
    );
};

export default CartModal;
