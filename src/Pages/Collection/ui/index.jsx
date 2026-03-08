import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { BreadCrumbs } from "@features/BreadCrumbs";
import { buildCollectionBreadcrumbItems } from "@features/BreadCrumbs/lib/build-items";
import { ProductCard } from "@entities/ProductCard";
import { useProductsList } from "@shared/lib";
import { Container, Text } from "@shared/styles";
import SectionTitle from "@shared/ui/SectionTitle";

import Styled from "./styled";

const CollectionPage = () => {
    const { t } = useTranslation();
    const { slug = "" } = useParams();
    const { data: products, isLoading, error } = useProductsList();

    const normalizedSlug = slug.toLowerCase();

    const items = useMemo(
        () =>
            products.filter(
                (product) => product.collection?.slug?.toLowerCase() === normalizedSlug
            ),
        [normalizedSlug, products]
    );

    const title = items[0]?.collection?.name || normalizedSlug;
    const breadcrumbs = buildCollectionBreadcrumbItems(title);

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
            <section>
                <Container>
                    <BreadCrumbs items={breadcrumbs} />
                </Container>
            </section>
            <section>
                <Container>
                    {items.length > 0 ? (
                        <>
                            <SectionTitle>{title}</SectionTitle>
                            <Styled.Count>
                                {t("searchPage.resultCount", { count: items.length })}
                            </Styled.Count>
                            <Styled.Products>
                                {items.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        variant={product.cardVariant}
                                    />
                                ))}
                            </Styled.Products>
                        </>
                    ) : (
                        <Styled.Empty>
                            <Text>{t("collection.notFound")}</Text>
                        </Styled.Empty>
                    )}
                </Container>
            </section>
        </>
    );
};

export default CollectionPage;
