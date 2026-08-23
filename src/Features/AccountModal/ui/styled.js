import styled from "styled-components";

import {
    CheckboxBox,
    CheckboxInput,
    CheckboxLabel,
    Field,
    InputField,
    Label,
} from "@shared/styles/form";
import { PanelContainer, PanelTitle, StatusMessage } from "@shared/styles/panel-list";
import Button from "@shared/ui/Button";

const Container = styled(PanelContainer)`
    flex: 1;
    min-height: 0;
    gap: 22px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const PasswordRow = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 10px;
    align-items: end;

    @media (max-width: 560px) {
        grid-template-columns: minmax(0, 1fr);
    }
`;

const ActionGroup = styled.div`
    display: flex;
    gap: 10px;
`;

const PrimaryButton = styled(Button)`
    justify-content: center;
    width: 100%;
`;

const TextActionButton = styled(Button)`
    align-self: center;
    min-width: auto;
    width: auto;
    height: auto;
    padding: 0;
    border-radius: 0;
`;

const Divider = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 20px;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.52;
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;

    &::before {
        content: "";
        position: absolute;
        inset: 50% 0 auto;
        border-top: 1px solid ${({ theme }) => theme.ui.panel.border};
        transform: translateY(-50%);
    }

    span {
        position: relative;
        z-index: 1;
        padding: 0 10px;
        background: ${({ theme }) =>
            theme.mode === "light" ? theme.ui.modal.bgLight : theme.ui.modal.bgDark};
    }
`;

const SubSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 18px;
    border-top: 1px solid ${({ theme }) => theme.ui.panel.border};
`;

const FieldsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

const AddressCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
    background: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.panel.bgLight : theme.ui.panel.bgDark};
`;

const AddressName = styled.p`
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
`;

const AddressLine = styled.p`
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.65;
`;

const AddressActions = styled.div`
    display: flex;
    gap: 10px;
    flex-shrink: 0;
`;

const AccountEmail = styled.p`
    font-size: 15px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
`;

const OrderList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const OrderCard = styled.div`
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
    border-radius: 12px;
    overflow: hidden;
`;

const OrderRow = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 14px;
    text-align: left;
    cursor: pointer;
    background: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.panel.bgLight : theme.ui.panel.bgDark};
`;

const OrderRowEnd = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    flex-shrink: 0;
`;

const OrderStatusBadge = styled.span`
    display: inline-block;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.modal.bgLight : theme.ui.modal.bgDark};
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
`;

const OrderItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 14px;
    border-top: 1px solid ${({ theme }) => theme.ui.panel.border};
`;

const Styled = {
    AccountEmail,
    ActionGroup,
    AddressActions,
    AddressCard,
    AddressLine,
    AddressName,
    CheckboxBox,
    CheckboxInput,
    CheckboxLabel,
    Container,
    Divider,
    Field,
    FieldsGrid,
    Form,
    InputField,
    Label,
    OrderCard,
    OrderItems,
    OrderList,
    OrderRow,
    OrderRowEnd,
    OrderStatusBadge,
    PanelTitle,
    PasswordRow,
    PrimaryButton,
    StatusMessage,
    SubSection,
    TextActionButton,
};

export default Styled;
