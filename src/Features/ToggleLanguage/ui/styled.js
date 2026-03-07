import styled from "styled-components";

const Box = styled.div`
    display: flex;
    gap: 6px;
`;

const Flag = styled.button`
    background: ${({ theme }) =>
        theme.mode === "light"
            ? theme.ui.iconButton.bgLight
            : theme.ui.iconButton.bgDark};
    border: 1px solid
        ${({ theme, $active }) =>
            $active
                ? theme.colors.text
                : theme.mode === "light"
                  ? theme.ui.iconButton.borderLight
                  : theme.ui.iconButton.borderDark};
    border-radius: 10px;
    padding: 6px;
    cursor: pointer;
    opacity: ${({ $active }) => ($active ? 1 : 0.8)};

    &:hover {
        opacity: 1;
    }
`;

const Icon = styled.img`
    width: 24px;
    height: 24px;
`;

const Styled = { Box, Flag, Icon };

export default Styled;
