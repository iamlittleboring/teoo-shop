import Styled from "../../styled";

const ProductMeta = ({ id, type, typeLabel, variant }) => {
    return (
        <Styled.Top>
            <Styled.Code>#{String(id).padStart(2, "0")}</Styled.Code>
            <Styled.TagLink
                to={`/search?category=${encodeURIComponent(type || "")}`}
                $variant={variant}
            >
                {typeLabel}
            </Styled.TagLink>
        </Styled.Top>
    );
};

export default ProductMeta;
