import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
`;

const Title = styled.h1`
    font-weight: 800;
    font-size: 52px;
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    align-items: center;
    gap: 20px;
    flex: 1;
    min-width: 0;
    line-height: 1;

    @media (max-width: 640px) {
        font-size: 28px;
        gap: 12px;
    }

    &::after {
        content: "";
        display: block;
        flex: 1 1 auto;
        min-width: 12px;
        height: 1px;
        background-color: ${({ theme }) => theme.colors.text};
        opacity: 0.6;
        transform: translateY(4px);
    }
`;

// `flex: 0 1 auto` (the default) so the text claims exactly its natural
// width first — the trailing rule (::after above, `flex: 1 1 auto`) only
// grows into whatever's left over. Giving the rule a `width: 100%` basis
// instead made it compete with the text for space and crushed even short
// titles down to a sliver, ellipsis-truncating them for no reason.
const TitleText = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
`;

const SideText = styled.p`
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 12px;
    transform: translateY(4px);
`;

const Styled = { Wrapper, Title, TitleText, SideText };

export default Styled;
