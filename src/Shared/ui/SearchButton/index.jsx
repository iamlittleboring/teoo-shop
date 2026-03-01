import { Input } from "@shared/styles";
import { useState } from "react";
import Styled from "./styled";

const SearchButton = ({ icon }) => {
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

    const handleOnChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <Styled.Box
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleOnFocus}
            onBlur={handleOnUnFocus}
        >
            <Styled.Image src={icon} alt="" aria-hidden="true" />
            <Styled.Input $hover={hover}>
                <Input
                    type="text"
                    aria-label="Search products"
                    placeholder="Search"
                    value={search}
                    onChange={handleOnChange}
                />
            </Styled.Input>
        </Styled.Box>
    );
};

export default SearchButton;
