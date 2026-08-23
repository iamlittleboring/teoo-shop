import { Container } from "@shared/styles";
import SectionTitle from "@shared/ui/SectionTitle";

import Styled from "./styled";

const LegalPageLayout = ({ title, updatedAt, children }) => (
    <section>
        <Container>
            <SectionTitle>{title}</SectionTitle>
            {updatedAt && <Styled.UpdatedAt>{updatedAt}</Styled.UpdatedAt>}
            <Styled.Prose>{children}</Styled.Prose>
        </Container>
    </section>
);

export default LegalPageLayout;
