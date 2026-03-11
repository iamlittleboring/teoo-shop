import { useState } from "react";
import { useTranslation } from "react-i18next";

import { AccountModal } from "@features/AccountModal";
import { CartModal } from "@features/CartModal";
import { FavoritesModal } from "@features/FavoritesModal";
import { useTheme } from "@shared/lib";
import { Container } from "@shared/styles";
import Button from "@shared/ui/Button";
import IconActionButton from "@shared/ui/IconActionButton";
import SearchButton from "@shared/ui/SearchButton";

import bulb from "@shared/assets/images/bulb.svg";
import cart from "@shared/assets/images/cart.svg";
import heart from "@shared/assets/images/heart.svg";
import instagram from "@shared/assets/images/instagram.svg";
import logo from "@shared/assets/images/logo.png";
import search from "@shared/assets/images/search.svg";
import user from "@shared/assets/images/user.svg";

import Styled from "./styled";

const Header = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { t } = useTranslation();

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);

    const toggleCart = () => setIsCartOpen((prev) => !prev);
    const toggleFavorites = () => setIsFavoritesOpen((prev) => !prev);
    const toggleAccount = () => setIsAccountOpen((prev) => !prev);

    return (
        <Styled.Header>
            <Container>
                <Styled.Box>
                    <Styled.Logo src={logo} alt="logo" />
                    <Styled.Menu>
                        <Styled.MenuItem>
                            <Styled.MenuLink to="/">{t("header.menu.new")}</Styled.MenuLink>
                        </Styled.MenuItem>
                        <Styled.MenuItem>
                            <Styled.MenuLink to="/t-shorts">
                                {t("header.menu.tshirts")}
                            </Styled.MenuLink>
                        </Styled.MenuItem>
                        <Styled.MenuItem>
                            <Styled.MenuLink to="/hoodies">
                                {t("header.menu.hoodies")}
                            </Styled.MenuLink>
                        </Styled.MenuItem>
                    </Styled.Menu>
                    <Styled.Quick>
                        <Button
                            onClick={toggleTheme}
                            icon={bulb}
                            width="52px"
                            height="52px"
                            isActive={isDarkMode}
                            ariaLabel={t("header.actions.toggleTheme")}
                        />

                        <Button
                            as="a"
                            href="https://www.instagram.com/teoo.shop"
                            target="_blank"
                            rel="noreferrer noopener"
                            icon={instagram}
                            width="52px"
                            height="52px"
                            ariaLabel={t("header.actions.instagram")}
                        />

                        <IconActionButton
                            icon={heart}
                            size="52px"
                            onClick={toggleFavorites}
                            ariaLabel={t("header.actions.openFavorites")}
                        />

                        <IconActionButton
                            icon={cart}
                            size="52px"
                            onClick={toggleCart}
                            ariaLabel={t("header.actions.openCart")}
                        />
                        <CartModal isOpen={isCartOpen} onClose={toggleCart} />
                        <FavoritesModal
                            isOpen={isFavoritesOpen}
                            onClose={toggleFavorites}
                        />
                        <Button
                            icon={user}
                            width="52px"
                            height="52px"
                            onClick={toggleAccount}
                            ariaLabel={t("header.actions.account")}
                        />
                        <AccountModal isOpen={isAccountOpen} onClose={toggleAccount} />
                        <SearchButton icon={search} />
                    </Styled.Quick>
                </Styled.Box>
            </Container>
        </Styled.Header>
    );
};

export default Header;
