import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
`;

const Title = styled.h1`
    font-weight: 800;
    font-size: 52px;
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    align-items: center;
    gap: 20px;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
    line-height: 1;

    &::after {
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background-color: ${({ theme }) => theme.colors.text};
        opacity: 0.6;
        transform: translateY(4px);
    }
`;

const SideText = styled.p`
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 12px;
    transform: translateY(4px);
`;

const Styled = { Wrapper, Title, SideText };

export default Styled;
