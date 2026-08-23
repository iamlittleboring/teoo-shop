import Styled from "./styled";

// Every "data is loading" moment in the app renders through here — swap in
// a logo or any other visual later and it updates everywhere at once.
const LoadingState = ({ fullPage = false, message }) => (
    <Styled.Box $fullPage={fullPage}>
        <Styled.Message>{message}</Styled.Message>
    </Styled.Box>
);

export default LoadingState;
