import Styled from "./styled";

const Modal = ({ children, isOpen, onClose }) => {
    return (
        isOpen && (
            <Styled.Overlay onClick={onClose}>
                <Styled.Container onClick={(event) => event.stopPropagation()}>
                    <Styled.CloseButton
                        type="button"
                        onClick={onClose}
                        size="xs"
                        appearance="ghost"
                        ariaLabel="Close modal"
                    >
                        x
                    </Styled.CloseButton>
                    <Styled.Body>{children}</Styled.Body>
                </Styled.Container>
            </Styled.Overlay>
        )
    );
};

export default Modal;
