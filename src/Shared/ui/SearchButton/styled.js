import styled from "styled-components";

import Button from "@shared/ui/Button";
import { buttonSurfaceCss } from "@shared/ui/icon-button-base";

const Box = styled.form`
    ${buttonSurfaceCss};

    justify-content: flex-start;
    padding: 14px;
    min-height: 52px;
    width: ${({ $wide }) => ($wide ? "100%" : "auto")};
    gap: 12px;
    overflow: hidden;

    &:hover {
        transform: translateY(-1px);
        box-shadow: ${({ theme }) => theme.ui.iconButton.hoverShadow};
    }
`;

const SubmitButton = styled(Button)`
    min-width: 24px;
    width: 24px;
    height: 24px;
    padding: 0;
    flex-shrink: 0;
`;

const Input = styled.div`
    position: ${({ $hover }) => ($hover ? "static" : "absolute")};
    left: ${({ $hover }) => ($hover ? "0" : "100%")};
    width: ${({ $hover, $wide }) => ($hover ? ($wide ? "100%" : "220px") : "0")};
    opacity: ${({ $hover }) => ($hover ? 1 : 0)};
    pointer-events: ${({ $hover }) => ($hover ? "auto" : "none")};
    transition: width 0.2s ease, opacity 0.2s ease;

    input {
        min-width: 0;
        width: 100%;
    }
`;

const Styled = {
    Box,
    SubmitButton,
    Input,
};

export default Styled;
