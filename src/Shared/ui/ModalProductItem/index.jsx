import { Link } from "react-router-dom";

import Styled from "./styled";

const ModalProductItem = ({
    image,
    name,
    price,
    nameTo,
    onNameClick,
    details,
    bottomContent,
    action,
}) => {
    return (
        <Styled.Container>
            <Styled.Image src={image} alt={name} loading="lazy" />
            <Styled.Info>
                {nameTo ? (
                    <Link to={nameTo} onClick={onNameClick}>
                        <Styled.Name>{name}</Styled.Name>
                    </Link>
                ) : (
                    <Styled.Name>{name}</Styled.Name>
                )}
                {details}
                <Styled.Price>{price} грн</Styled.Price>
                {bottomContent}
            </Styled.Info>
            {action ? <Styled.Action>{action}</Styled.Action> : null}
        </Styled.Container>
    );
};

export default ModalProductItem;
