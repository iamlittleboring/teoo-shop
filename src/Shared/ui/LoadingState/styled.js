import styled, { keyframes } from "styled-components";

const pulse = keyframes`
    0%, 100% {
        opacity: 0.35;
    }
    50% {
        opacity: 1;
    }
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    min-height: ${({ $fullPage }) => ($fullPage ? "50vh" : "140px")};
    text-align: center;
    padding: 24px;
`;

const Message = styled.p`
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: ${({ theme }) => theme.colors.text};
    animation: ${pulse} 1.6s ease-in-out infinite;
`;

const Styled = { Box, Message };

export default Styled;
