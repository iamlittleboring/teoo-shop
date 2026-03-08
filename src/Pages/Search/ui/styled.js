import styled from "styled-components";

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 16px;
`;

const Count = styled.p`
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.75;
`;

const SortSelect = styled.select`
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
    border-radius: 8px;
    padding: 8px 10px;
    color: ${({ theme }) => theme.colors.text};
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
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
    border-radius: 10px;
    padding: 20px;
`;

const Styled = {
    Top,
    Count,
    SortSelect,
    Layout,
    Products,
    Empty,
};

export default Styled;
