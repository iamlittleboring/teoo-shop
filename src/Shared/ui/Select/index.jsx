import { Children, useEffect, useRef, useState } from "react";

import chevronDown from "@shared/assets/images/chevron-down.svg";

import Styled from "./styled";

// Native <select> popups are painted by the OS, not the page — on most
// platforms that means they ignore the site's web font no matter what CSS
// says. This draws the dropdown itself instead, so the font is guaranteed,
// while keeping the same value/onChange/<option> API as a native select so
// it's a drop-in swap at every call site.
const Select = ({ children, id, onChange, value, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const rootRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return undefined;

        const handleClickOutside = (event) => {
            if (rootRef.current && !rootRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const options = Children.toArray(children);
    const selected = options.find((option) => option.props.value === value);
    const placeholder = options.find((option) => option.props.disabled);

    const handleSelect = (optionValue) => {
        setIsOpen(false);
        onChange?.({ target: { value: optionValue } });
    };

    return (
        <Styled.Wrapper ref={rootRef}>
            <Styled.Trigger
                type="button"
                id={id}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                {...props}
            >
                <Styled.TriggerLabel $isPlaceholder={!selected}>
                    {selected ? selected.props.children : placeholder?.props.children}
                </Styled.TriggerLabel>
                <Styled.Arrow
                    src={chevronDown}
                    alt=""
                    aria-hidden="true"
                    $iconSize="14px"
                    $open={isOpen}
                />
            </Styled.Trigger>

            {isOpen && (
                <Styled.Dropdown role="listbox">
                    {options
                        .filter((option) => !option.props.disabled)
                        .map((option) => (
                            <Styled.Option
                                key={option.props.value}
                                type="button"
                                role="option"
                                aria-selected={option.props.value === value}
                                $active={option.props.value === value}
                                onClick={() => handleSelect(option.props.value)}
                            >
                                {option.props.children}
                            </Styled.Option>
                        ))}
                </Styled.Dropdown>
            )}
        </Styled.Wrapper>
    );
};

export default Select;
