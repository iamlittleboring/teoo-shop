import Styled from "./styled";

const NotFound = () => {
    return (
        <Styled.Box>
            <Styled.Text>Page not found</Styled.Text>
            <Styled.HomeLink to={"/"}>Back to home{">>>"}</Styled.HomeLink>
        </Styled.Box>
    );
};

export default NotFound;
