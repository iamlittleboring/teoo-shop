import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = styled.footer`
    margin-top: auto;
`;

const Box = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 100%;
    margin-top: auto;
`;

const Links = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding-top: 14px;
    padding-bottom: 14px;
    border-top: 1px solid ${({ theme }) => theme.ui.panel.border};
`;

const LegalLink = styled(Link)`
    font-size: 13px;
    font-weight: 600;
    opacity: 0.65;
    color: ${({ theme }) => theme.colors.text};

    &:hover {
        opacity: 1;
    }
`;

const Styled = {
    Footer,
    Box,
    Links,
    LegalLink,
};

export default Styled;
