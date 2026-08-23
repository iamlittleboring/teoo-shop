import Styled from "./styled";

const SectionTitle = ({ children, sideText }) => {
    return (
        <Styled.Wrapper>
            <Styled.Title>
                <Styled.TitleText>{children}</Styled.TitleText>
            </Styled.Title>
            {sideText ? <Styled.SideText>{sideText}</Styled.SideText> : null}
        </Styled.Wrapper>
    );
};

export default SectionTitle;
