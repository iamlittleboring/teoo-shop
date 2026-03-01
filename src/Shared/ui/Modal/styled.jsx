import styled from "styled-components";

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
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 20px;
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.ui.modal.closeBorder};
    border-radius: 6px;
    padding: 4px 8px;
`;

const Styled = { Overlay, Container, CloseButton };

export default Styled;
