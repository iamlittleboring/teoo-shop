import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useSearchParams } from "react-router-dom";

import { AccountModal } from "@features/AccountModal";
import { CartModal } from "@features/CartModal";
import { useTheme } from "@shared/lib";
import { Container } from "@shared/styles";
import Button from "@shared/ui/Button";
import IconActionButton from "@shared/ui/IconActionButton";
import SearchButton from "@shared/ui/SearchButton";

import bulb from "@shared/assets/images/bulb.svg";
import cart from "@shared/assets/images/cart.svg";
import instagram from "@shared/assets/images/instagram.svg";
import logo from "@shared/assets/images/logo.png";
import menu from "@shared/assets/images/menu.svg";
import search from "@shared/assets/images/search.svg";
import user from "@shared/assets/images/user.svg";

import { hasAccountFlowParams, stripAccountFlowParams } from "../lib/account-flow-params";
import Styled from "./styled";

const Header = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { t } = useTranslation();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleCart = () => setIsCartOpen((prev) => !prev);
    const toggleAccount = () => setIsAccountOpen((prev) => !prev);
    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

    // Any navigation (including a search submitted from inside the panel)
    // should close it — otherwise it's left floating over the new page.
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const shouldOpenForAccountFlow = useMemo(
        () => hasAccountFlowParams(searchParams),
        [searchParams]
    );

    useEffect(() => {
        if (shouldOpenForAccountFlow) {
            setIsAccountOpen(true);
        }
    }, [shouldOpenForAccountFlow]);

    const handleAccountClose = () => {
        setIsAccountOpen(false);

        if (!shouldOpenForAccountFlow) {
            return;
        }

        setSearchParams(stripAccountFlowParams(searchParams), { replace: true });
    };

    return (
        <Styled.Header>
            <Container>
                <Styled.Box>
                    <Styled.Logo $hidden={isMobileMenuOpen} src={logo} alt="logo" />
                    <Styled.Quick>
                        <Button
                            onClick={toggleTheme}
                            icon={bulb}
                            size="s"
                            isActive={isDarkMode}
                            ariaLabel={t("header.actions.toggleTheme")}
                        />

                        <Button
                            as="a"
                            href="https://www.instagram.com/teoo.shop"
                            target="_blank"
                            rel="noreferrer noopener"
                            icon={instagram}
                            size="s"
                            ariaLabel={t("header.actions.instagram")}
                        />

                        <IconActionButton
                            icon={cart}
                            size="52px"
                            onClick={toggleCart}
                            ariaLabel={t("header.actions.openCart")}
                        />
                        <Button
                            icon={user}
                            size="s"
                            onClick={toggleAccount}
                            ariaLabel={t("header.actions.account")}
                        />
                        <SearchButton icon={search} />
                    </Styled.Quick>

                    <Styled.MobileQuick>
                        {isMobileMenuOpen && (
                            <Styled.MobileIcons>
                                <IconActionButton
                                    icon={cart}
                                    size="52px"
                                    onClick={toggleCart}
                                    ariaLabel={t("header.actions.openCart")}
                                />
                                <Button
                                    icon={user}
                                    size="s"
                                    onClick={toggleAccount}
                                    ariaLabel={t("header.actions.account")}
                                />
                                <Button
                                    onClick={toggleTheme}
                                    icon={bulb}
                                    size="s"
                                    isActive={isDarkMode}
                                    ariaLabel={t("header.actions.toggleTheme")}
                                />
                                <Button
                                    as="a"
                                    href="https://www.instagram.com/teoo.shop"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    icon={instagram}
                                    size="s"
                                    ariaLabel={t("header.actions.instagram")}
                                />
                            </Styled.MobileIcons>
                        )}

                        <Button
                            icon={menu}
                            size="s"
                            isActive={isMobileMenuOpen}
                            onClick={toggleMobileMenu}
                            aria-expanded={isMobileMenuOpen}
                            ariaLabel={t("header.actions.menu")}
                        />
                    </Styled.MobileQuick>
                </Styled.Box>

                {isMobileMenuOpen && (
                    <Styled.MobileMenuPanel>
                        <SearchButton icon={search} forceExpanded />
                    </Styled.MobileMenuPanel>
                )}
            </Container>

            <CartModal isOpen={isCartOpen} onClose={toggleCart} />
            <AccountModal isOpen={isAccountOpen} onClose={handleAccountClose} />
        </Styled.Header>
    );
};

export default Header;
