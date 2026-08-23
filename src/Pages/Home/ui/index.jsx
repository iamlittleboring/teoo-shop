import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ProductCard } from "@entities/ProductCard";
import { useProductsList } from "@shared/lib";
import { Container, Text } from "@shared/styles";
import LoadingState from "@shared/ui/LoadingState";
import SectionTitle from "@shared/ui/SectionTitle";

import { groupProductsByCategory } from "../lib/group-by-category";
import Styled from "./styled";

const Home = () => {
    const { t } = useTranslation();
    const { data: products, isLoading, error } = useProductsList();
    const sections = useMemo(
        () => groupProductsByCategory(products, t("home.fallbackTitle")),
        [products, t]
    );

    if (isLoading) {
        return (
            <section>
                <Container>
                    <LoadingState message={t("common.loadingProducts")} fullPage />
                </Container>
            </section>
        );
    }

    if (error) {
        return (
            <section>
                <Container>
                    <Text>{error}</Text>
                </Container>
            </section>
        );
    }

    return (
        <>
            {sections.map((section) => {
                return (
                    <section key={section.key}>
                        <Container>
                            <Styled.Section>
                                <SectionTitle>{section.title}</SectionTitle>
                                <Styled.Products>
                                    {section.items.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            variant={product.cardVariant || section.variant}
                                        />
                                    ))}
                                </Styled.Products>
                            </Styled.Section>
                        </Container>
                    </section>
                );
            })}
        </>
    );
};

export default Home;
