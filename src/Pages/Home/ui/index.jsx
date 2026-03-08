import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ProductCard } from "@entities/ProductCard";
import { useProductsList } from "@shared/lib";
import { Container, Text } from "@shared/styles";
import SectionTitle from "@shared/ui/SectionTitle";

import Styled from "./styled";

const Home = () => {
    const { t } = useTranslation();
    const { data: products, isLoading, error } = useProductsList();
    const categoryConfig = useMemo(
        () => ({
            tshirts: {
                title: t("home.categories.tshirts.title"),
                subtitle: t("home.categories.tshirts.subtitle"),
                variant: "classic",
            },
            hoodies: {
                title: t("home.categories.hoodies.title"),
                subtitle: t("home.categories.hoodies.subtitle"),
                variant: "street",
            },
            accessories: {
                title: t("home.categories.accessories.title"),
                subtitle: t("home.categories.accessories.subtitle"),
                variant: "clean",
            },
        }),
        [t]
    );

    const groupedProducts = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }

        acc[product.category].push(product);

        return acc;
    }, {});

    if (isLoading) {
        return (
            <section>
                <Container>
                    <Text>{t("common.loadingProducts")}</Text>
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
            {Object.entries(categoryConfig).map(([categoryKey, config]) => {
                const items = groupedProducts[categoryKey] || [];

                if (items.length === 0) {
                    return null;
                }

                return (
                    <section key={categoryKey}>
                        <Container>
                            <Styled.Section>
                                <SectionTitle sideText={config.subtitle}>
                                    {config.title}
                                </SectionTitle>
                                <Styled.Products>
                                    {items.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            variant={product.cardVariant || config.variant}
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
