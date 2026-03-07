import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

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
                <Styled.Price>
                    {price} <Styled.Currency>{t("common.currency")}</Styled.Currency>
                </Styled.Price>
                {bottomContent}
            </Styled.Info>
            {action ? <Styled.Action>{action}</Styled.Action> : null}
        </Styled.Container>
    );
};

export default ModalProductItem;
