import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { CartButton } from "@features/CartButton";

import { variantLabel } from "../config";
import { formatProductCode } from "../lib/format-product-code";
import Styled from "./styled";

const ProductCard = ({ product, variant = "classic" }) => {
    const { t } = useTranslation();
    const {
        categories = [],
        collection,
        description,
        id,
        image,
        inStock = true,
        name,
        originalPrice,
        price,
        variantId,
    } = product;
    const primaryCategory = categories[0] || null;
    const collectionSlug = collection?.slug;
    const collectionName = collection?.name || "Drop";

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
                <Styled.Top>
                    <Styled.Code>{formatProductCode(id)}</Styled.Code>
                    {primaryCategory?.handle ? (
                        <Styled.TagLink
                            to={`/search?category=${encodeURIComponent(primaryCategory.handle)}`}
                            $variant={variant}
                        >
                            {primaryCategory.name}
                        </Styled.TagLink>
                    ) : null}
                </Styled.Top>

                <Link to={`/product/${id}`}>
                    <Styled.Name>{name}</Styled.Name>
                </Link>

                <Styled.Desc>{description}</Styled.Desc>

                <Styled.Buy>
                    <Styled.Prices>
                        <Styled.PriceLabel>Price</Styled.PriceLabel>
                        <Styled.PriceRow>
                            <Styled.Price>
                                {price} <Styled.Currency>{t("common.currency")}</Styled.Currency>
                            </Styled.Price>
                            {originalPrice ? (
                                <Styled.OriginalPrice>
                                    {originalPrice} {t("common.currency")}
                                </Styled.OriginalPrice>
                            ) : null}
                        </Styled.PriceRow>
                    </Styled.Prices>
                    <Styled.Actions>
                        {!inStock && (
                            <Styled.OutOfStock>
                                {t("common.productStatus.outOfStock")}
                            </Styled.OutOfStock>
                        )}
                        <CartButton
                            variantId={variantId}
                            styleVariant={variant}
                            disabled={!inStock}
                        />
                    </Styled.Actions>
                </Styled.Buy>
            </Styled.Data>
        </Styled.Box>
    );
};

export default ProductCard;
