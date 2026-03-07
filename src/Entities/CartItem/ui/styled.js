import styled from "styled-components";

import { Meta } from "@shared/styles/panel-list";

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

const Actions = styled.div`
    display: inline-flex;
    flex-direction: column;
    gap: 8px;
`;

const ActionButton = styled.button`
    width: 28px;
    height: 28px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.ui.cartItem.counterBorder};
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;

    &:hover {
        opacity: 0.85;
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

const CountValue = styled.span`
    min-width: 28px;
    text-align: center;
    font-weight: 700;
`;

const TrashIcon = styled.img`
    width: 16px;
    height: 16px;
    filter: invert(${({ theme }) => (theme.mode === "light" ? "0%" : "100%")});
`;

const Styled = {
    Details,
    Size,
    Color,
    Dot,
    Actions,
    ActionButton,
    CountValue,
    TrashIcon,
};

export default Styled;
