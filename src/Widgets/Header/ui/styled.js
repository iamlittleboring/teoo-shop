import styled from "styled-components";

const Header = styled.header`
    position: relative;

    // One continuous surface for the whole mobile nav — the icon row and the
    // dropdown panel below it share this exact background/border so they
    // read as a single bar, not a plain row with an unrelated card stuck
    // under it.
    @media (max-width: 1000px) {
        padding-block: 12px;
        background: ${({ theme }) =>
            theme.mode === "light" ? theme.ui.modal.bgLight : theme.ui.modal.bgDark};
        border-bottom: 1px solid ${({ theme }) => theme.ui.panel.border};
    }
`;

const Box = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const Logo = styled.img`
    @media (max-width: 1000px) {
        display: ${({ $hidden }) => ($hidden ? "none" : "block")};
    }
`;

const Quick = styled.div`
    display: flex;
    gap: 10px;

    @media (max-width: 1000px) {
        display: none;
    }
`;

const MobileQuick = styled.div`
    display: none;
    align-items: center;
    gap: 10px;

    @media (max-width: 1000px) {
        display: flex;
        width: 100%;
    }

    // The menu button is always the last child here, whether or not the
    // icon row next to it is rendered (it only shows once the menu is
    // open) — margin-left: auto pins it to the right in both cases,
    // where justify-content: space-between would collapse to the left
    // with just one child.
    & > *:last-child {
        margin-left: auto;
    }
`;

const MobileIcons = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
`;

const MobileMenuPanel = styled.div`
    display: none;

    @media (max-width: 1000px) {
        display: flex;
        flex-direction: column;
        gap: 14px;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 900;
        padding: 16px;
        border-radius: 0 0 14px 14px;
        border: 1px solid ${({ theme }) => theme.ui.panel.border};
        border-top: none;
        background: ${({ theme }) =>
            theme.mode === "light" ? theme.ui.modal.bgLight : theme.ui.modal.bgDark};
        box-shadow: ${({ theme }) => theme.ui.iconButton.hoverShadow};
    }
`;

const Styled = {
    Header,
    Box,
    Logo,
    Quick,
    MobileQuick,
    MobileIcons,
    MobileMenuPanel,
};

export default Styled;
