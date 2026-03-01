import IconActionButton from "@shared/ui/IconActionButton";
import cartIcon from "@shared/assets/images/cart.svg";
import { createCartKey, useCart } from "@shared/lib";

const CartButton = ({ product, selectedColor, selectedSize, styleVariant = "classic" }) => {
    const { addItem, removeItem, isInCart } = useCart();

    const payload = {
        productId: product.id,
        size: selectedSize,
        color: selectedColor,
    };

    const isAdded = isInCart(payload);

    const handleOnClick = () => {
        if (isAdded) {
            removeItem(createCartKey(payload));
            return;
        }

        addItem({
            ...payload,
            image: product.image,
            name: product.name,
            price: product.price,
            quantity: 1,
        });
    };

    return (
        <IconActionButton
            icon={cartIcon}
            onClick={handleOnClick}
            isActive={isAdded}
            showActiveDot
            variant={styleVariant}
            ariaLabel={isAdded ? "Remove from cart" : "Add to cart"}
            title={isAdded ? "Remove from cart" : "Add to cart"}
        />
    );
};

export default CartButton;
