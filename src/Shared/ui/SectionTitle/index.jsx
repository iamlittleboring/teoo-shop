import Styled from "./styled";

const SectionTitle = ({ children, sideText }) => {
    return (
        <Styled.Wrapper>
            <Styled.Title>{children}</Styled.Title>
            {sideText ? <Styled.SideText>{sideText}</Styled.SideText> : null}
        </Styled.Wrapper>
    );
};

export default SectionTitle;
