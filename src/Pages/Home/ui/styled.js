import styled from "styled-components";

const Section = styled.div`
    margin-bottom: 48px;
`;

const Products = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 26px;
    align-items: stretch;
`;

const Styled = { Section, Products };

export default Styled;
