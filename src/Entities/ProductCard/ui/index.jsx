import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { CartButton } from "@features/CartButton";
import { FavoriteButton } from "@features/FavoriteButton";

import Styled from "./styled";

const variantLabel = {
    classic: "Classic",
    street: "Street",
    clean: "Minimal",
};

const ProductCard = ({ product, variant = "classic" }) => {
    const { t } = useTranslation();
    const { description, id, image, name, price } = product;

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
                    <Styled.Badge $variant={variant}>
                        {variantLabel[variant] || "Drop"}
                    </Styled.Badge>
                </Styled.ImageWrap>
            </Styled.ImageLink>

            <Styled.Data>
                <Styled.Top>
                    <Styled.Code>#{String(id).padStart(2, "0")}</Styled.Code>
                    <Styled.Tag $variant={variant}>Teoo</Styled.Tag>
                </Styled.Top>

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
