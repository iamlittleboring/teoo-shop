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

const Styled = {
    Box,
    Icon,
};

export default Styled;
