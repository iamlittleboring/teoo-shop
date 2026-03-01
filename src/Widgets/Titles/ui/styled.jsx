import styled from "styled-components";

const Wrap = styled.section`
    text-align: center;
`;

const MainTitle = styled.h1`
    margin-top: 70px;
    font-size: 64px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 10px;
`;
const SubTitle = styled.h2`
    font-size: 32px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 70px;
`;

const Styled = { Wrap, MainTitle, SubTitle };

export default Styled;
