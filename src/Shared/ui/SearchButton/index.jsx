import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Input } from "@shared/styles";

import Styled from "./styled";

const SearchButton = ({ icon }) => {
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

    const handleOnUnFocus = () => {
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
            as="form"
            onSubmit={handleSubmit}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleOnFocus}
            onBlur={handleOnUnFocus}
        >
            <button type="submit" aria-label={t("searchInput.open")}>
                <Styled.Image src={icon} alt="" aria-hidden="true" />
            </button>
            <Styled.Input $hover={hover}>
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
