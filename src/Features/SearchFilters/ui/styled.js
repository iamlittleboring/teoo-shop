import styled from "styled-components";

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

const Styled = {
    Sidebar,
    FilterBlock,
    FilterTitle,
    CheckboxLabel,
    RangeRow,
    Field,
    ResetButton,
};

export default Styled;
