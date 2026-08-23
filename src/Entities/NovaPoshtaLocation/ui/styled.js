import styled from "styled-components";

const LocationPicker = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    margin-top: 4px;
    border-radius: 12px;
    background-color: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.panel.bgLight : theme.ui.panel.bgDark};
`;

const LocationFieldsRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    & > * {
        flex: 1;
        min-width: 140px;
    }
`;

const SearchWrap = styled.div`
    position: relative;
`;

const SearchDropdown = styled.div`
    position: absolute;
    z-index: 5;
    top: calc(100% + 6px);
    left: 0;
    right: 0;
    max-height: 240px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
    background: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.modal.bgLight : theme.ui.modal.bgDark};
    box-shadow: ${({ theme }) => theme.ui.iconButton.hoverShadow};
`;

const SearchResultItem = styled.button`
    text-align: left;
    padding: 10px 14px;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) =>
            theme.mode === "light" ? theme.ui.panel.bgLight : theme.ui.panel.bgDark};
    }
`;

const SearchHint = styled.p`
    padding: 10px 14px;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
`;

const Styled = {
    LocationFieldsRow,
    LocationPicker,
    SearchDropdown,
    SearchHint,
    SearchResultItem,
    SearchWrap,
};

export default Styled;
