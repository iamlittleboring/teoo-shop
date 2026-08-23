import styled from "styled-components";

const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex-wrap: wrap;
    margin-top: 32px;
`;

const StepButton = styled.button`
    min-width: 36px;
    height: 36px;
    padding: 0 10px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
    background: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.panel.bgLight : theme.ui.panel.bgDark};
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;

    &:disabled {
        opacity: 0.4;
        cursor: default;
    }
`;

const PageButton = styled(StepButton)`
    min-width: 36px;
    padding: 0;
    background: ${({ theme, $active }) =>
        $active
            ? theme.colors.text
            : theme.mode === "light"
              ? theme.ui.panel.bgLight
              : theme.ui.panel.bgDark};
    color: ${({ theme, $active }) => ($active ? theme.colors.bg : theme.colors.text)};
`;

const Ellipsis = styled.span`
    padding: 0 4px;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.5;
`;

const Styled = { Nav, StepButton, PageButton, Ellipsis };

export default Styled;
