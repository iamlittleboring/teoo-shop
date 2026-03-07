import { Link } from "react-router-dom";
import styled from "styled-components";

const Box = styled.div``;

const Text = styled.p`
    font-size: 48px;
    font-weight: 800;
    text-align: center;
    margin-bottom: 15px;
    margin-top: 30px;
`;

const HomeLink = styled(Link)`
    font-size: 24px;
    text-decoration: underline;
    font-weight: 500;
    text-align: center;
    text-underline-offset: 5px;
    width: 100%;
    display: inline-block;
`;

const Styled = { Box, Text, HomeLink };

export default Styled;
