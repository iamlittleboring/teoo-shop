import { useTranslation } from "react-i18next";

import ua from "@shared/assets/images/ua.svg";
import uk from "@shared/assets/images/uk.svg";

import Styled from "./styled";

const ToggleLanguage = () => {
    const { i18n, t } = useTranslation();
    const activeLanguage = i18n.resolvedLanguage || i18n.language;

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    return (
        <Styled.Box>
            <Styled.Flag
                type="button"
                onClick={() => changeLanguage("uk")}
                $active={activeLanguage === "uk"}
                aria-label={t("footer.langUa")}
                title={t("footer.langUa")}
            >
                <Styled.Icon src={ua} alt="Ukrainian language" />
            </Styled.Flag>
            <Styled.Flag
                type="button"
                onClick={() => changeLanguage("en")}
                $active={activeLanguage === "en"}
                aria-label={t("footer.langEn")}
                title={t("footer.langEn")}
            >
                <Styled.Icon src={uk} alt="English language" />
            </Styled.Flag>
        </Styled.Box>
    );
};

export default ToggleLanguage;
