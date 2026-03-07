import styled from "styled-components";

const BottomNav = styled.nav`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    z-index: 1000;
    padding: 20px;
    background-color: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.bottomNav.bgLight : theme.ui.bottomNav.bgDark};
    border-radius: 10px 10px 0 0;

    @media (min-width: 1000px) {
        display: none;
    }
`;

const Styled = { BottomNav };

export default Styled;
