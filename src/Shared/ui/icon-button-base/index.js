import styled from "styled-components";

const getAccent = (theme, variant) =>
    theme.ui.accents[variant] || theme.ui.accents.classic;

const IconButtonBase = styled.button`
    appearance: none;
    outline: none;
    width: ${({ $size = "52px" }) => $size};
    height: ${({ $size = "52px" }) => $size};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    cursor: pointer;
    border: 1px solid
        ${({ theme, $active }) => {
            if ($active) {
                return theme.mode === "light"
                    ? "rgba(0, 0, 0, 0.08)"
                    : "rgba(255, 255, 255, 0.26)";
            }

            return theme.mode === "light"
                ? theme.ui.iconButton.borderLight
                : theme.ui.iconButton.borderDark;
        }};
    background:
        ${({ theme, $active, $variant }) => {
            if ($active) {
                return `radial-gradient(circle at 30% 20%, ${getAccent(
                    theme,
                    $variant
                )}, ${theme.ui.iconButton.activeGradientTo})`;
            }

            return theme.mode === "light"
                ? theme.ui.iconButton.bgLight
                : theme.ui.iconButton.bgDark;
        }};
    box-shadow: ${({ theme, $active }) =>
        $active ? "none" : theme.ui.iconButton.shadow};
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    position: relative;
    background-clip: padding-box;

    &:hover {
        box-shadow: ${({ theme, $active }) =>
            $active ? "none" : theme.ui.iconButton.hoverShadow};
    }
`;

const IconBase = styled.img`
    width: ${({ $iconSize = "22px" }) => $iconSize};
    height: ${({ $iconSize = "22px" }) => $iconSize};
    filter: ${({ theme, $active }) => {
        if ($active) {
            return "invert(100%)";
        }

        return theme.mode === "light" ? "invert(0%)" : "invert(100%)";
    }};
`;

export { IconButtonBase, IconBase, getAccent };
