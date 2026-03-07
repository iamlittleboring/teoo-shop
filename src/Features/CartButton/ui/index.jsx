import IconActionButton from "@shared/ui/IconActionButton";
import cartIcon from "@shared/assets/images/cart.svg";
import { createCartKey, useCart } from "@shared/lib";
import { useTranslation } from "react-i18next";

const CartButton = ({ product, selectedColor, selectedSize, styleVariant = "classic" }) => {
    const { addItem, removeItem, isInCart } = useCart();
    const { t } = useTranslation();

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
            variant={styleVariant}
            ariaLabel={isAdded ? t("cart.removeItem") : t("cart.addItem")}
            title={isAdded ? t("cart.removeItem") : t("cart.addItem")}
        />
    );
};

export default CartButton;
