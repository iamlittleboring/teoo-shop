import Button from "@shared/ui/Button";
import { useTheme } from "@shared/lib";
import { useTranslation } from "react-i18next";

import Styled from "./styled";

import instagram from "@shared/assets/images/instagram.svg";
import cart from "@shared/assets/images/cart.svg";
import user from "@shared/assets/images/user.svg";
import bulb from "@shared/assets/images/bulb.svg";
import burger from "@shared/assets/images/burger.svg";

const BottomNav = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { t } = useTranslation();

    return (
        <Styled.BottomNav>
            <Button
                onClick={toggleTheme}
                icon={bulb}
                width="52px"
                height="52px"
                isActive={isDarkMode}
                ariaLabel={t("header.actions.toggleTheme")}
            />
            <Button
                icon={instagram}
                width="52px"
                height="52px"
                ariaLabel={t("common.instagram")}
            />
            <Button icon={cart} width="52px" height="52px" ariaLabel={t("cart.title")} />
            <Button
                icon={user}
                width="52px"
                height="52px"
                ariaLabel={t("common.account")}
            />
            <Button icon={burger} width="52px" height="52px" ariaLabel={t("common.menu")} />
        </Styled.BottomNav>
    );
};

export default BottomNav;
