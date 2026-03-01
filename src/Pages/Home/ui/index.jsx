import { ProductCard } from "@entities/ProductCard";
import { Text, Title } from "@shared/styles";

import { useLoadProducts } from "../lib";

import Styled from "./styled";

const categoryConfig = {
    tshirts: {
        title: "T-Shirts",
        subtitle: "Daily essentials",
        variant: "classic",
    },
    hoodies: {
        title: "Hoodies",
        subtitle: "Street layer",
        variant: "street",
    },
    accessories: {
        title: "Accessories",
        subtitle: "Final touch",
        variant: "clean",
    },
};

const Home = () => {
    const { data: products, isLoading, error } = useLoadProducts();

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
                <Text>Loading products...</Text>
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
