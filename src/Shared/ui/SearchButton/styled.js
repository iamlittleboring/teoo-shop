import styled from "styled-components";

const Box = styled.div`
    display: inline-flex;
    justify-content: center;
    padding: 14px;
    max-height: 52px;
    gap: 12px;
    align-items: center;
    border-radius: 14px;
    border: 1px solid
        ${({ theme }) =>
            theme.mode === "light"
                ? theme.ui.iconButton.borderLight
                : theme.ui.iconButton.borderDark};
    background: ${({ theme }) =>
        theme.mode === "light"
            ? theme.ui.iconButton.bgLight
            : theme.ui.iconButton.bgDark};
    box-shadow: ${({ theme }) => theme.ui.iconButton.shadow};
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    position: relative;
    overflow: hidden;

    button {
        cursor: pointer;
        padding: 0;
        margin: 0;
        display: inline-flex;
    }

    &:hover {
        transform: translateY(-1px);
        box-shadow: ${({ theme }) => theme.ui.iconButton.hoverShadow};
    }
`;

const Input = styled.div`
    left: 100%;
    transition: all 0.2s ease-in-out;
    position: ${({ $hover }) => ($hover ? "static !important" : "absolute")};
`;

const Image = styled.img`
    width: 22px;
    height: 22px;
    filter: invert(
        ${({ theme }) => (theme.mode === "light" ? "0%" : "100%")}
    );
`;

const Styled = {
    Box,
    Input,
    Image,
};

export default Styled;
