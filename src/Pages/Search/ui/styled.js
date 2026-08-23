import styled from "styled-components";

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 20px;
`;

const Count = styled.p`
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 12px;
`;

const Layout = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 24px;

    @media (max-width: 980px) {
        grid-template-columns: 1fr;
    }
`;

const Products = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    align-items: stretch;
`;

const Empty = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 220px;
    text-align: center;
    padding: 40px 20px;
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
    border-radius: 14px;
    background: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.panel.bgLight : theme.ui.panel.bgDark};
`;

const Styled = {
    Top,
    Count,
    Layout,
    Products,
    Empty,
};

export default Styled;
