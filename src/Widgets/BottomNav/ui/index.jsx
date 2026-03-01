import Button from "@shared/ui/Button";
import { useTheme } from "@shared/lib";

import Styled from "./styled";

import instagram from "@shared/assets/images/instagram.svg";
import cart from "@shared/assets/images/cart.svg";
import user from "@shared/assets/images/user.svg";
import bulb from "@shared/assets/images/bulb.svg";
import burger from "@shared/assets/images/burger.svg";

const BottomNav = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <Styled.BottomNav>
            <Button
                onClick={toggleTheme}
                icon={bulb}
                width="52px"
                height="52px"
                isActive={isDarkMode}
                ariaLabel="Toggle theme"
            />
            <Button icon={instagram} width="52px" height="52px" ariaLabel="Instagram" />
            <Button icon={cart} width="52px" height="52px" ariaLabel="Cart" />
            <Button icon={user} width="52px" height="52px" ariaLabel="Account" />
            <Button icon={burger} width="52px" height="52px" ariaLabel="Menu" />
        </Styled.BottomNav>
    );
};

export default BottomNav;
