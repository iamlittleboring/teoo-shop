import heartFilledIcon from "@shared/assets/images/heart-filled.svg";
import heartIcon from "@shared/assets/images/heart.svg";
import IconActionButton from "@shared/ui/IconActionButton";
import { useFavorites } from "@shared/lib";
import { useTranslation } from "react-i18next";

const FavoriteButton = ({ product }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const { t } = useTranslation();
    const active = isFavorite(product.id);

    return (
        <IconActionButton
            icon={active ? heartFilledIcon : heartIcon}
            onClick={() => toggleFavorite(product)}
            isActive={active}
            ariaLabel={active ? t("favorites.removeItem") : t("favorites.add")}
            title={active ? t("favorites.removeItem") : t("favorites.add")}
        />
    );
};

export default FavoriteButton;
