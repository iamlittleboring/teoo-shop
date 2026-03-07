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
