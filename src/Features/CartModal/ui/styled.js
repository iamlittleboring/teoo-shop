import styled from "styled-components";

import {
    DangerOutlineButton,
    FooterRow,
    PanelContainer,
    Total,
} from "@shared/styles/panel-list";

const Container = styled(PanelContainer)`
    flex: 1;
    min-height: 0;
`;

const Items = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`;

const Footer = styled(FooterRow)`
    margin-top: 10px;
`;
const Currency = styled.span`
    text-transform: uppercase;
`;
const ClearButton = styled(DangerOutlineButton)``;

const Styled = {
    Container,
    Items,
    Footer,
    Total,
    Currency,
    ClearButton,
};

export default Styled;
