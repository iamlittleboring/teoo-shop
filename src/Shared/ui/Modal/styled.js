import styled from "styled-components";
import Button from "@shared/ui/Button";

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: ${({ theme }) => theme.ui.modal.overlayBg};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const Container = styled.div`
    background: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.modal.bgLight : theme.ui.modal.bgDark};
    padding: 24px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    min-height: 500px;
    max-height: 600px;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

// Content taller than the modal's fixed height scrolls in here while the
// close button (a sibling, not a child) stays put — it's positioned against
// Container, not against this scrolling box.
const Body = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`;

const CloseButton = styled(Button)`
    position: absolute;
    top: 8px;
    right: 8px;
    min-width: 36px;
    width: 36px;
    height: 36px;
    padding: 0;
    font-size: 20px;
    z-index: 999;
`;

const Styled = { Overlay, Container, Body, CloseButton };

export default Styled;
