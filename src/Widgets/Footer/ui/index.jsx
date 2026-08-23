import { ToggleLanguage } from "@features/ToggleLanguage";
import { Container, Text } from "@shared/styles";
import { useTranslation } from "react-i18next";

import Styled from "./styled";

import smalllogo from "@shared/assets/images/small-logo.png";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <Styled.Footer>
            <Container>
                <Styled.Links>
                    <Styled.LegalLink to="/terms">{t("footer.terms")}</Styled.LegalLink>
                    <Styled.LegalLink to="/privacy">{t("footer.privacy")}</Styled.LegalLink>
                    <Styled.LegalLink to="/returns">{t("footer.returns")}</Styled.LegalLink>
                </Styled.Links>
                <Styled.Box>
                    <img src={smalllogo} alt="logo" />
                    <Text>{t("footer.copyright")}</Text>
                    <ToggleLanguage />
                </Styled.Box>
            </Container>
        </Styled.Footer>
    );
};

export default Footer;
