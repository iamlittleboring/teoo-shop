import styled from "styled-components";

import { Input } from "./index";

const Field = styled.label`
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
`;

const FieldsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @media (max-width: 560px) {
        grid-template-columns: 1fr;
    }
`;

const Label = styled.span`
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.64;
`;

const InputField = styled(Input)`
    width: 100%;
    min-height: 52px;
    padding: 0 16px;
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
    border-radius: 8px;
    background: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.panel.bgLight : theme.ui.panel.bgDark};
    font-size: 16px;
    font-weight: 600;
    line-height: 1;

    &::placeholder {
        color: ${({ theme }) => theme.colors.text};
        opacity: 0.42;
        font-weight: 500;
    }
`;

const CheckboxLabel = styled.label`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
`;

const CheckboxInput = styled.input`
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
`;

const CheckboxBox = styled.span`
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    border-radius: 6px;
    border: 1px solid
        ${({ theme }) =>
            theme.mode === "light"
                ? theme.ui.iconButton.borderLight
                : theme.ui.iconButton.borderDark};
    background-color: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.iconButton.bgLight : theme.ui.iconButton.bgDark};
    background-repeat: no-repeat;
    background-position: center;
    background-size: 12px;
    transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

    ${CheckboxInput}:checked + & {
        border-color: ${({ theme }) => theme.ui.accents.classic};
        background-color: ${({ theme }) => theme.ui.accents.classic};
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M5 11.917L9.724 16.5L19 7.5' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }

    ${CheckboxInput}:focus-visible + & {
        box-shadow: 0 0 0 3px ${({ theme }) => theme.ui.accents.classic}33;
    }
`;

export {
    CheckboxBox,
    CheckboxInput,
    CheckboxLabel,
    Field,
    FieldsGrid,
    InputField,
    Label,
};
