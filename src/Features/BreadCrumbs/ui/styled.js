import styled from "styled-components";

const Box = styled.ul`
    display: flex;
    gap: 10px;
    margin-block: 30px;
`;

const Item = styled.li`
    font-size: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};

    &::after {
        content: ">";
        margin-left: 10px;
    }
    &:last-child::after {
        display: none;
    }

    a {
        text-decoration: underline;
        text-underline-offset: 3px;
    }
`;

const Styled = {
    Box,
    Item,
};

export default Styled;
