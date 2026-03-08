import styled from "styled-components";

const Count = styled.p`
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.75;
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
    Count,
    Products,
    Empty,
};

export default Styled;
