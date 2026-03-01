import heartFilledIcon from "@shared/assets/images/heart-filled.svg";
import heartIcon from "@shared/assets/images/heart.svg";
import IconActionButton from "@shared/ui/IconActionButton";
import { useFavorites } from "@shared/lib";

const FavoriteButton = ({ product }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const active = isFavorite(product.id);

    return (
        <IconActionButton
            icon={active ? heartFilledIcon : heartIcon}
            onClick={() => toggleFavorite(product)}
            isActive={active}
            ariaLabel={active ? "Remove from favorites" : "Add to favorites"}
            title={active ? "Remove from favorites" : "Add to favorites"}
        />
    );
};

export default FavoriteButton;
