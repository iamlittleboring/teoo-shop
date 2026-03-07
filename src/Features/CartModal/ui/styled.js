import styled from "styled-components";

import {
    DangerOutlineButton,
    FooterRow,
    PanelContainer,
    Total,
} from "@shared/styles/panel-list";

const Container = styled(PanelContainer)`
    flex: 1;
`;
const Footer = styled(FooterRow)`
    margin-top: auto;
`;
const ClearButton = styled(DangerOutlineButton)``;

const Styled = {
    Container,
    Footer,
    Total,
    ClearButton,
};

export default Styled;
