import ua from "@shared/assets/images/ua.svg";
import uk from "@shared/assets/images/uk.svg";

import Styled from "./styled";

const ToggleLanguage = () => {
    return (
        <Styled.Box>
            <Styled.Flag type="button" aria-label="Switch to Ukrainian">
                <Styled.Icon src={ua} alt="Ukrainian language" />
            </Styled.Flag>
            <Styled.Flag type="button" aria-label="Switch to English">
                <Styled.Icon src={uk} alt="English language" />
            </Styled.Flag>
        </Styled.Box>
    );
};

export default ToggleLanguage;
