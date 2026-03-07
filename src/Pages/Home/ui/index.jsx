import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ProductCard } from "@entities/ProductCard";
import { Text, Title } from "@shared/styles";

import { useLoadProducts } from "../lib";

import Styled from "./styled";

const Home = () => {
    const { t } = useTranslation();
    const { data: products, isLoading, error } = useLoadProducts();
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
            <Styled.Shell>
                <Text>{t("common.loadingProducts")}</Text>
            </Styled.Shell>
        );
    }

    if (error) {
        return (
            <Styled.Shell>
                <Text>{error}</Text>
            </Styled.Shell>
        );
    }

    return (
        <Styled.Shell>
            {Object.entries(categoryConfig).map(([categoryKey, config]) => {
                const items = groupedProducts[categoryKey] || [];

                if (items.length === 0) {
                    return null;
                }

                return (
                    <Styled.Section key={categoryKey}>
                        <Styled.Header>
                            <Title>{config.title}</Title>
                            <Styled.SubTitle>{config.subtitle}</Styled.SubTitle>
                        </Styled.Header>
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
                );
            })}
        </Styled.Shell>
    );
};

export default Home;
