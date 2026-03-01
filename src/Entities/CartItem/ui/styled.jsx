import styled from "styled-components";

import {
    DangerLinkButton,
    Info,
    Meta,
    Name,
    PanelCard,
    Price,
    Thumb,
} from "@shared/styles/panel-list";

const Container = styled(PanelCard)``;
const Image = styled(Thumb)``;

const Details = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`;

const Size = styled(Meta)``;
const Color = styled(Meta)`
    display: inline-flex;
    align-items: center;
    gap: 6px;
`;

const Dot = styled.span`
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 999px;
    border: 1px solid ${({ theme }) => theme.ui.cartItem.dotBorder};
    background-color: ${({ $color }) => $color || "transparent"};
`;

const Counter = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
`;

const CounterButton = styled.button`
    width: 28px;
    height: 28px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.ui.cartItem.counterBorder};
    cursor: pointer;

    &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }
`;

const CounterValue = styled.span`
    min-width: 22px;
    text-align: center;
    font-weight: 700;
`;

const RemoveButton = styled(DangerLinkButton)``;

const Styled = {
    Container,
    Image,
    Name,
    Info,
    Details,
    Color,
    Size,
    Dot,
    Price,
    Counter,
    CounterButton,
    CounterValue,
    RemoveButton,
};

export default Styled;
