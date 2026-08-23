import styled from "styled-components";

import { CheckboxBox, CheckboxInput, CheckboxLabel } from "@shared/styles/form";
import Button from "@shared/ui/Button";

const Sidebar = styled.aside`
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
    border-radius: 14px;
    padding: 18px;
    height: fit-content;
    position: sticky;
    top: 12px;
    background: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.panel.bgLight : theme.ui.panel.bgDark};

    @media (max-width: 980px) {
        position: static;
        order: -1;
    }
`;

const FilterBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 22px;

    &:last-of-type {
        margin-bottom: 18px;
    }
`;

const FilterTitle = styled.h3`
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
`;

const RangeRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
`;

const Field = styled.input`
    border: 1px solid
        ${({ theme }) =>
            theme.mode === "light"
                ? theme.ui.iconButton.borderLight
                : theme.ui.iconButton.borderDark};
    border-radius: 10px;
    padding: 10px 12px;
    min-width: 0;
    background-color: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.iconButton.bgLight : theme.ui.iconButton.bgDark};
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
    font-size: 14px;
    transition: border-color 0.2s ease;

    &::placeholder {
        color: ${({ theme }) => theme.colors.text};
        opacity: 0.42;
        font-weight: 500;
    }

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.ui.accents.classic};
    }

    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const ResetButton = styled(Button)`
    justify-content: center;
    align-self: flex-start;
`;

const Styled = {
    Sidebar,
    FilterBlock,
    FilterTitle,
    CheckboxLabel,
    CheckboxInput,
    CheckboxBox,
    RangeRow,
    Field,
    ResetButton,
};

export default Styled;
