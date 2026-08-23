import styled from "styled-components";

import {
    IconBase,
    buttonSurfaceCss,
    interactiveButtonCss,
    resolveButtonSize,
} from "@shared/ui/icon-button-base";

const resolveButtonAppearance = ({ $active, $appearance, theme }) => {
    if ($active) {
        return null;
    }

    if ($appearance === "solid") {
        return {
            background: theme.colors.text,
            borderColor: theme.colors.text,
            boxShadow: "none",
            color: theme.colors.bg,
        };
    }

    if ($appearance === "danger-outline") {
        return {
            background: "transparent",
            borderColor: theme.ui.panel.danger,
            boxShadow: "none",
            color: theme.ui.panel.danger,
        };
    }

    if ($appearance === "danger-link") {
        return {
            background: "transparent",
            borderColor: "transparent",
            boxShadow: "none",
            color: theme.ui.panel.danger,
        };
    }

    if ($appearance === "ghost") {
        return {
            background: "transparent",
            borderColor: "transparent",
            boxShadow: "none",
            color: theme.colors.text,
        };
    }

    return null;
};

const Box = styled.button`
    ${buttonSurfaceCss};
    ${interactiveButtonCss};

    gap: ${({ $hasText }) => ($hasText ? "10px" : "0")};
    min-width: ${({ $width, $size, $hasText }) =>
        $width || ($hasText ? "auto" : resolveButtonSize($size))};
    width: ${({ $width, $size, $hasText }) =>
        $width || ($hasText ? "auto" : resolveButtonSize($size))};
    height: ${({ $height, $size }) => $height || resolveButtonSize($size)};
    padding: ${({ $hasText, $size }) => {
        if (!$hasText) {
            return "0";
        }

        if ($size === "xs") {
            return "0 14px";
        }

        if ($size === "xl") {
            return "0 20px";
        }

        return "0 18px";
    }};
    font-size: ${({ $size }) => ($size === "xs" ? "13px" : "14px")};
    font-weight: 800;
    line-height: 1;
    white-space: nowrap;
    text-align: left;
    color: ${({ theme, $active, $appearance }) =>
        resolveButtonAppearance({ $active, $appearance, theme })?.color ||
        ($active ? theme.colors.bg : theme.colors.text)};
    background: ${({ theme, $active, $appearance }) =>
        resolveButtonAppearance({ $active, $appearance, theme })?.background};
    border-color: ${({ theme, $active, $appearance }) =>
        resolveButtonAppearance({ $active, $appearance, theme })?.borderColor};
    box-shadow: ${({ theme, $active, $appearance }) =>
        resolveButtonAppearance({ $active, $appearance, theme })?.boxShadow};

    &:hover {
        box-shadow: ${({ theme, $active, $appearance }) =>
            resolveButtonAppearance({ $active, $appearance, theme })?.boxShadow};
        background-color: ${({ theme, $appearance }) =>
            $appearance === "danger-outline"
                ? theme.ui.panel.dangerHoverBg
                : undefined};
        opacity: ${({ $appearance }) => ($appearance === "danger-link" ? 0.8 : undefined)};
    }
`;

const Icon = styled(IconBase)`
    width: ${({ $iconSize, $size, $hasText }) => {
        if ($iconSize) {
            return $iconSize;
        }

        if ($hasText) {
            return $size === "xs" ? "16px" : "18px";
        }

        return "22px";
    }};
    height: ${({ $iconSize, $size, $hasText }) => {
        if ($iconSize) {
            return $iconSize;
        }

        if ($hasText) {
            return $size === "xs" ? "16px" : "18px";
        }

        return "22px";
    }};
`;

const Label = styled.span`
    order: ${({ $iconPosition }) => ($iconPosition === "end" ? -1 : 0)};
`;

const Styled = {
    Box,
    Icon,
    Label,
};

export default Styled;
