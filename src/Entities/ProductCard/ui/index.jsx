import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { CartButton } from "@features/CartButton";
import { FavoriteButton } from "@features/FavoriteButton";

import ProductMeta from "./components/ProductMeta";
import Styled from "./styled";

const variantLabel = {
    classic: "Classic",
    street: "Street",
    clean: "Minimal",
};

const ProductCard = ({ product, variant = "classic" }) => {
    const { t } = useTranslation();
    const { collection, description, id, image, name, price, type } = product;
    const typeLabel = t(`productTypes.${type}`);
    const collectionSlug = collection?.slug;
    const collectionName = collection?.name || "Drop";

    const buttonPayload = {
        id,
        image,
        name,
        price,
    };

    return (
        <Styled.Box $variant={variant}>
            <Styled.ImageLink to={`/product/${id}`}>
                <Styled.ImageWrap>
                    <Styled.Image src={image} alt={name} loading="lazy" />
                    <Styled.BadgeLink
                        to={collectionSlug ? `/collection/${collectionSlug}` : "/"}
                        $variant={variant}
                    >
                        {collectionName || variantLabel[variant] || "Drop"}
                    </Styled.BadgeLink>
                </Styled.ImageWrap>
            </Styled.ImageLink>

            <Styled.Data>
                <ProductMeta
                    id={id}
                    type={type}
                    typeLabel={typeLabel}
                    variant={variant}
                />

                <Link to={`/product/${id}`}>
                    <Styled.Name>{name}</Styled.Name>
                </Link>

                <Styled.Desc>{description}</Styled.Desc>

                <Styled.Buy>
                    <Styled.Prices>
                        <Styled.PriceLabel>Price</Styled.PriceLabel>
                        <Styled.Price>
                            {price}{" "}
                            <Styled.Currency>{t("common.currency")}</Styled.Currency>
                        </Styled.Price>
                    </Styled.Prices>
                    <Styled.Actions>
                        <FavoriteButton product={buttonPayload} />
                        <CartButton
                            product={buttonPayload}
                            styleVariant={variant}
                        />
                    </Styled.Actions>
                </Styled.Buy>
            </Styled.Data>
        </Styled.Box>
    );
};

export default ProductCard;
