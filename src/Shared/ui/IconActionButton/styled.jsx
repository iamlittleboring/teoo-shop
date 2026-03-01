import styled from "styled-components";

import { IconBase, IconButtonBase } from "@shared/ui/icon-button-base/index";

const Box = styled(IconButtonBase)`
    width: ${({ $width, $size }) => $width || $size || "52px"};
    height: ${({ $height, $size }) => $height || $size || "52px"};
`;

const Icon = styled(IconBase)`
    width: ${({ $iconSize }) => $iconSize || "22px"};
    height: ${({ $iconSize }) => $iconSize || "22px"};
`;

const ActiveDot = styled.span`
    position: absolute;
    top: 8px;
    right: 8px;
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background-color: ${({ theme }) => theme.ui.iconButton.activeDot};
`;

const Styled = {
    Box,
    Icon,
    ActiveDot,
};

export default Styled;
