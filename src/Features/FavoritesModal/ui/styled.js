import styled from "styled-components";

import {
    DangerLinkButton,
    DangerOutlineButton,
    PanelContainer,
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

const Remove = styled(DangerLinkButton)``;
const ClearButton = styled(DangerOutlineButton)`
    margin-top: 10px;
`;

const Styled = {
    Container,
    Items,
    Remove,
    ClearButton,
};

export default Styled;
