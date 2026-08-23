import styled from "styled-components";

import {
    DangerOutlineButton,
    FooterRow,
    PanelContainer,
    PanelTitle,
    StatusMessage,
    Total,
} from "@shared/styles/panel-list";
import Button from "@shared/ui/Button";

const Container = styled(PanelContainer)`
    flex: 1;
    min-height: 0;
`;

const Title = styled(PanelTitle)``;

const Items = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`;

const EmptyState = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px 20px;
`;

const FooterBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 10px;
    padding-top: 16px;
    border-top: 1px solid ${({ theme }) => theme.ui.panel.border};
`;
const Footer = styled(FooterRow)``;
const Currency = styled.span`
    text-transform: uppercase;
`;
const ClearButton = styled(DangerOutlineButton)`
    justify-content: center;
`;
const CheckoutButton = styled(Button)`
    justify-content: center;
    width: 100%;
`;

const Styled = {
    Container,
    Title,
    Items,
    EmptyState,
    StatusMessage,
    FooterBlock,
    Footer,
    Total,
    Currency,
    ClearButton,
    CheckoutButton,
};

export default Styled;
