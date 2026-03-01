import styled from "styled-components";

import {
    DangerLinkButton,
    DangerOutlineButton,
    Info,
    Name,
    PanelCard,
    PanelContainer,
    Price,
    Thumb,
} from "@shared/styles/panel-list";

const Container = styled(PanelContainer)``;
const Item = styled(PanelCard)``;
const Image = styled(Thumb)``;
const Remove = styled(DangerLinkButton)``;
const ClearButton = styled(DangerOutlineButton)``;

const Styled = {
    Container,
    Item,
    Image,
    Info,
    Name,
    Price,
    Remove,
    ClearButton,
};

export default Styled;
