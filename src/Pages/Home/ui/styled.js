import styled from "styled-components";

const Shell = styled.div`
    max-width: 1440px;
    margin-inline: auto;
    padding-inline: 10px;
    width: 100%;

    @media (max-width: 700px) {
        padding-inline: 10px;
    }
`;

const Section = styled.section`
    margin-bottom: 48px;
`;

const Header = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
`;

const SubTitle = styled.p`
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 12px;
`;

const Products = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 26px;
    align-items: stretch;
`;

const Styled = { Shell, Section, Header, SubTitle, Products };

export default Styled;
