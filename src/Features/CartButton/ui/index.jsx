import IconActionButton from "@shared/ui/IconActionButton";
import cartIcon from "@shared/assets/images/cart.svg";
import { useTranslation } from "react-i18next";
import { useCart } from "@shared/lib";

const CartButton = ({ disabled = false, options = [], styleVariant = "classic", variantId }) => {
    const { addItem, isInCart, isLoading, isUpdating, items, removeItem } = useCart();
    const { t } = useTranslation();
    const isAdded = isInCart({ variantId });
    const activeItem = items.find((item) => item.variantId === variantId);

    const handleOnClick = () => {
        if (!variantId) {
            return;
        }

        if (isAdded) {
            removeItem(activeItem?.lineId);
            return;
        }

        addItem({
            options,
            quantity: 1,
            variantId,
        });
    };

    return (
        <IconActionButton
            icon={cartIcon}
            onClick={handleOnClick}
            isActive={isAdded}
            variant={styleVariant}
            disabled={disabled || !variantId || isLoading || isUpdating}
            ariaLabel={isAdded ? t("cart.removeItem") : t("cart.addItem")}
            title={isAdded ? t("cart.removeItem") : t("cart.addItem")}
        />
    );
};

export default CartButton;
