import styled from "styled-components";

import Button from "@shared/ui/Button";

const Layout = styled.div`
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 24px;
    align-items: start;

    @media (max-width: 980px) {
        grid-template-columns: 1fr;
    }
`;

const Main = styled.div`
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
    border-radius: 14px;
    padding: 28px;
    background: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.panel.bgLight : theme.ui.panel.bgDark};

    @media (max-width: 640px) {
        padding: 20px;
    }
`;

const Summary = styled.aside`
    display: flex;
    flex-direction: column;
    gap: 16px;
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
    border-radius: 14px;
    padding: 20px;
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

const SummaryItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 320px;
    overflow-y: auto;
`;

const SummaryTitle = styled.h3`
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
`;

const SummaryRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
`;

const SummaryTotalRow = styled(SummaryRow)`
    font-size: 20px;
    font-weight: 800;
    padding-top: 12px;
    border-top: 1px solid ${({ theme }) => theme.ui.panel.border};
`;

const Muted = styled.span`
    opacity: 0.6;
    font-weight: 500;
`;

const ErrorText = styled.p`
    color: ${({ theme }) => theme.ui.panel.danger};
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 16px;
`;

const Stepper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 24px;
`;

const Step = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px 6px 6px;
    border-radius: 999px;
    border: 1px solid
        ${({ $active, theme }) =>
            $active
                ? theme.ui.accents.classic
                : theme.mode === "light"
                  ? theme.ui.iconButton.borderLight
                  : theme.ui.iconButton.borderDark};
    background-color: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.iconButton.bgLight : theme.ui.iconButton.bgDark};
    cursor: ${({ $done }) => ($done ? "pointer" : "default")};
    transition: border-color 0.2s ease;
`;

const StepNumber = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 800;
    background-color: ${({ $active, $done, theme }) =>
        $active || $done ? theme.ui.accents.classic : "transparent"};
    color: ${({ $active, $done, theme }) =>
        $active || $done ? "#fff" : theme.colors.text};
    border: 1px solid
        ${({ $active, $done, theme }) =>
            $active || $done ? theme.ui.accents.classic : theme.ui.panel.border};
`;

const StepLabel = styled.span`
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    opacity: ${({ $active }) => ($active ? 1 : 0.6)};
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const RadioList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const RadioInput = styled.input`
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
`;

const RadioCard = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 12px;
    border: 1px solid
        ${({ theme }) =>
            theme.mode === "light"
                ? theme.ui.iconButton.borderLight
                : theme.ui.iconButton.borderDark};
    background-color: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.iconButton.bgLight : theme.ui.iconButton.bgDark};
    cursor: pointer;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    ${RadioInput}:checked + & {
        border-color: ${({ theme }) => theme.ui.accents.classic};
    }
`;

const RadioIndicator = styled.span`
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border-radius: 999px;
    border: 1px solid
        ${({ theme }) =>
            theme.mode === "light"
                ? theme.ui.iconButton.borderLight
                : theme.ui.iconButton.borderDark};
    position: relative;

    &::after {
        content: "";
        position: absolute;
        inset: 4px;
        border-radius: 999px;
        background: ${({ theme }) => theme.ui.accents.classic};
        opacity: 0;
        transition: opacity 0.15s ease;
    }

    ${RadioInput}:checked ~ &::after {
        opacity: 1;
    }
`;

const RadioContent = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
`;

const RadioName = styled.span`
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
`;

const RadioPrice = styled.span`
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    white-space: nowrap;
`;

const StepActions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-top: 24px;
`;

const ContinueButton = styled(Button)`
    justify-content: center;
`;

const ReviewBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-bottom: 18px;
    margin-bottom: 18px;
    border-bottom: 1px solid ${({ theme }) => theme.ui.panel.border};

    &:last-of-type {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }
`;

const ReviewBlockHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
`;

const ReviewText = styled.p`
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.75;
    font-size: 14px;
    line-height: 1.5;
`;

const EditLink = styled(Button)`
    min-width: auto;
    width: auto;
    height: auto;
    min-height: auto;
    padding: 0;
    border-radius: 0;
    font-size: 12px;
`;

const CarrierGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;

    &:last-of-type {
        margin-bottom: 0;
    }
`;

const CarrierTitle = styled.h3`
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
`;

// Still used directly here for the Ukrposhta manual warehouse-number field —
// the Nova Poshta search/dropdown variant of this wrapper now lives in
// @entities/NovaPoshtaLocation.
const LocationPicker = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    margin-top: 4px;
    border-radius: 12px;
    background-color: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.panel.bgLight : theme.ui.panel.bgDark};
`;

const PromoSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const PromoForm = styled.form`
    display: flex;
    gap: 8px;

    & > *:first-child {
        flex: 1;
        min-width: 0;
    }
`;

const PromoTag = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 10px 8px 12px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.ui.accents.classic};
    background: ${({ theme }) => `${theme.ui.accents.classic}14`};
`;

const PromoCode = styled.span`
    font-weight: 800;
    font-size: 13px;
    letter-spacing: 0.02em;
    color: ${({ theme }) => theme.ui.accents.classic};
`;

const PromoRemoveButton = styled(Button)`
    min-width: auto;
    width: auto;
    height: auto;
    padding: 0;
`;

const PromoApplyButton = styled(Button)`
    flex-shrink: 0;
    width: 52px;
    height: 52px;
`;

const Empty = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    text-align: center;
    min-height: 260px;
    padding: 40px 20px;
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
    border-radius: 14px;
    background: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.panel.bgLight : theme.ui.panel.bgDark};
`;

const Styled = {
    CarrierGroup,
    CarrierTitle,
    ContinueButton,
    Empty,
    ErrorText,
    EditLink,
    Form,
    Layout,
    LocationPicker,
    Main,
    Muted,
    PromoApplyButton,
    PromoCode,
    PromoForm,
    PromoRemoveButton,
    PromoSection,
    PromoTag,
    RadioCard,
    RadioContent,
    RadioIndicator,
    RadioInput,
    RadioList,
    RadioName,
    RadioPrice,
    ReviewBlock,
    ReviewBlockHeader,
    ReviewText,
    Step,
    StepActions,
    StepLabel,
    StepNumber,
    Stepper,
    Summary,
    SummaryItems,
    SummaryRow,
    SummaryTitle,
    SummaryTotalRow,
};

export default Styled;
