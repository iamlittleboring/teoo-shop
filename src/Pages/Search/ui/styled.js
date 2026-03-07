import styled from "styled-components";

const Shell = styled.div`
    max-width: 1440px;
    margin-inline: auto;
    padding-inline: 10px;
    width: 100%;
`;

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

const Sidebar = styled.aside`
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
    border-radius: 12px;
    padding: 14px;
    height: fit-content;
    position: sticky;
    top: 12px;
    background: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.panel.bgLight : theme.ui.panel.bgDark};

    @media (max-width: 980px) {
        position: static;
        order: -1;
    }
`;

const FilterBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 18px;
`;

const FilterTitle = styled.h3`
    font-size: 14px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
`;

const CheckboxLabel = styled.label`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
`;

const RangeRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
`;

const Field = styled.input`
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
    border-radius: 8px;
    padding: 8px;
    color: ${({ theme }) => theme.colors.text};
`;

const ResetButton = styled.button`
    border: 1px solid ${({ theme }) => theme.ui.panel.danger};
    color: ${({ theme }) => theme.ui.panel.danger};
    border-radius: 8px;
    padding: 8px 10px;
    cursor: pointer;
`;

const Empty = styled.div`
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
    border-radius: 10px;
    padding: 20px;
`;

const Styled = {
    Shell,
    Top,
    Count,
    SortSelect,
    Layout,
    Products,
    Sidebar,
    FilterBlock,
    FilterTitle,
    CheckboxLabel,
    RangeRow,
    Field,
    ResetButton,
    Empty,
};

export default Styled;
