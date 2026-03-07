import styled from "styled-components";

import { Info, Name, PanelCard, Price, Thumb } from "@shared/styles/panel-list";

const Container = styled(PanelCard)``;
const Image = styled(Thumb)``;
const Action = styled.div``;
const Currency = styled.span`
    text-transform: uppercase;
`;

const Styled = {
    Container,
    Image,
    Info,
    Name,
    Price,
    Action,
    Currency,
};

export default Styled;
