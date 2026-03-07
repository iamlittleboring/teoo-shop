import styled from "styled-components";

const Box = styled.div`
    display: flex;
    gap: 30px;
`;

const Data = styled.div`
    min-width: 60%;
`;

const Title = styled.h1`
    font-size: 32px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
`;

const Desc = styled.h2`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
`;

const BuyItems = styled.div`
    display: flex;
    margin-top: 300px;
    justify-content: left;
    align-items: center;
    gap: 20px;
`;

const Styled = { Box, Data, Title, Desc, BuyItems };

export default Styled;
