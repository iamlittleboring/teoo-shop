import styled from "styled-components";

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 10px;
    padding: 40px 20px;
    margin-bottom: 32px;
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
    border-radius: 14px;
    background: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.panel.bgLight : theme.ui.panel.bgDark};
`;

const OrderNumber = styled.p`
    font-weight: 800;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.text};
`;

const Subtitle = styled.p`
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.65;
    font-weight: 500;
    max-width: 480px;
`;

const Layout = styled.div`
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 24px;
    align-items: start;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

const Items = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

const Summary = styled.aside`
    display: flex;
    flex-direction: column;
    gap: 12px;
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
    border-radius: 14px;
    padding: 20px;
    background: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.panel.bgLight : theme.ui.panel.bgDark};

    @media (max-width: 900px) {
        order: -1;
    }
`;

const SummaryTitle = styled.h3`
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
`;

const SummaryRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
`;

const SummaryTotalRow = styled(SummaryRow)`
    font-size: 20px;
    font-weight: 800;
    padding-top: 12px;
    border-top: 1px solid ${({ theme }) => theme.ui.panel.border};
`;

const Muted = styled.span`
    opacity: 0.6;
    font-weight: 500;
`;

const Missing = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;
    padding: 60px 20px;
`;

const Styled = {
    Box,
    Items,
    Layout,
    Missing,
    Muted,
    OrderNumber,
    Subtitle,
    Summary,
    SummaryRow,
    SummaryTitle,
    SummaryTotalRow,
};

export default Styled;
