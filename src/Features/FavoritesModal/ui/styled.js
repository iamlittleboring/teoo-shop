import styled from "styled-components";

import {
    DangerLinkButton,
    DangerOutlineButton,
    PanelContainer,
} from "@shared/styles/panel-list";

const Container = styled(PanelContainer)`
    flex: 1;
`;
const Remove = styled(DangerLinkButton)``;
const ClearButton = styled(DangerOutlineButton)`
    margin-top: auto;
`;

const Styled = {
    Container,
    Remove,
    ClearButton,
};

export default Styled;
