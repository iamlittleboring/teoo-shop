import styled from "styled-components";

const Box = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    max-width: 100%;
    gap: 10px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid
        ${({ theme }) =>
            theme.mode === "light"
                ? "rgba(17, 24, 39, 0.1)"
                : "rgba(255, 255, 255, 0.14)"};
    background-color: ${({ theme }) =>
        theme.mode === "light" ? "rgba(255, 255, 255, 0.72)" : "rgba(255, 255, 255, 0.04)"};
`;

const PillButton = styled.button`
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 1000px;
    color: ${({ theme, $clicked }) =>
        $clicked ? theme.colors.bg : theme.colors.text};
    background-color: ${({ theme, $clicked }) =>
        $clicked ? theme.colors.text : theme.colors.bg};
    border: 1px solid
        ${({ theme, $clicked }) =>
            $clicked
                ? "transparent"
                : theme.mode === "light"
                  ? "rgba(17, 24, 39, 0.12)"
                  : "rgba(255, 255, 255, 0.18)"};
    box-shadow: ${({ theme, $clicked }) => ($clicked ? "none" : theme.shadow)};
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        background-color 0.2s ease;

    &:hover {
        transform: translateY(-1px);
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.text};
        outline-offset: 2px;
    }
`;

const SwatchButton = styled.button`
    background-color: ${({ $color }) => $color};
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    box-shadow: ${({ theme, $clicked }) => ($clicked ? "none" : theme.shadow)};
    position: relative;
    cursor: pointer;
    border-radius: 1000px;
    overflow: hidden;
    border: 1px solid
        ${({ theme, $clicked }) =>
            $clicked
                ? theme.colors.text
                : theme.mode === "light"
                  ? "rgba(17, 24, 39, 0.12)"
                  : "rgba(255, 255, 255, 0.18)"};
    transition: transform 0.2s ease, border-color 0.2s ease;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: ${({ theme, $clicked }) =>
            $clicked ? theme.ui.picker.selectedOverlay : "none"};
    }

    &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: ${({ theme, $clicked }) =>
            $clicked ? theme.ui.picker.checkIcon : "none"};
    }

    &:hover {
        transform: translateY(-1px);
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.text};
        outline-offset: 2px;
    }
`;

const Styled = { Box, PillButton, SwatchButton };

export default Styled;
