import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Input } from "@shared/styles";
import { IconBase } from "@shared/ui/icon-button-base";

import Styled from "./styled";

// `forceExpanded` is for the mobile menu panel — the input's expand/collapse
// is otherwise driven by hover, which doesn't exist on touch, so without it
// the search field would be permanently invisible on mobile.
const SearchButton = ({ forceExpanded = false, icon }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [hover, setHover] = useState(false);
    const [focus, setFocus] = useState(false);
    const [search, setSearch] = useState("");

    const handleOnMouseEnter = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        if (!focus) {
            setHover(false);
        }
    };

    const handleOnFocus = () => {
        setFocus(true);
    };

    const handleOnUnFocus = (event) => {
        if (event?.currentTarget?.contains(event.relatedTarget)) {
            return;
        }

        if (!search) {
            setFocus(false);
            setHover(false);
        }
    };

    const handleOnChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const query = search.trim();

        if (!query) {
            navigate("/search");
            return;
        }

        navigate(`/search?q=${encodeURIComponent(query)}`);
    };

    return (
        <Styled.Box
            $wide={forceExpanded}
            onSubmit={handleSubmit}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleOnFocus}
            onBlur={handleOnUnFocus}
        >
            <Styled.SubmitButton
                type="submit"
                size="s"
                ariaLabel={t("searchInput.open")}
                title={t("searchInput.open")}
                appearance="ghost"
            >
                <IconBase src={icon} alt="" aria-hidden="true" />
            </Styled.SubmitButton>
            <Styled.Input $hover={forceExpanded || hover} $wide={forceExpanded}>
                <Input
                    type="text"
                    aria-label={t("searchInput.products")}
                    placeholder={t("searchInput.placeholder")}
                    value={search}
                    onChange={handleOnChange}
                />
            </Styled.Input>
        </Styled.Box>
    );
};

export default SearchButton;
