import styled from "styled-components";

const Box = styled.div`
    display: inline-flex;
    max-width: 100%;
    gap: 10px;
    padding: 10px;
    box-shadow: ${({ theme }) => theme.shadow};
    border-radius: 5px;
`;

const SizeButton = styled.button`
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
    box-shadow: ${({ theme, $clicked }) => ($clicked ? "none" : theme.shadow)};
`;

const ColorButton = styled.button`
    background-color: ${({ $color }) => $color};
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    box-shadow: ${({ theme, $clicked }) => ($clicked ? "none" : theme.shadow)};
    position: relative;
    cursor: pointer;
    border-radius: 1000px;
    overflow: hidden;

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
`;

const Styled = { Box, SizeButton, ColorButton };

export default Styled;
