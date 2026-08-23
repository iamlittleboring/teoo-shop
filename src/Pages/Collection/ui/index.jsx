import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
    BreadCrumbs,
    buildCollectionBreadcrumbItems,
} from "@features/BreadCrumbs";
import { ProductCard } from "@entities/ProductCard";
import { paginate, useProductsList } from "@shared/lib";
import { Container, Text } from "@shared/styles";
import LoadingState from "@shared/ui/LoadingState";
import Pagination from "@shared/ui/Pagination";
import SectionTitle from "@shared/ui/SectionTitle";

import { PRODUCTS_PER_PAGE } from "../config";
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

    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [normalizedSlug]);

    const { pageCount, currentPage, pageItems: paginated } = paginate(
        items,
        page,
        PRODUCTS_PER_PAGE
    );

    const title = items[0]?.collection?.name || normalizedSlug;
    const breadcrumbs = buildCollectionBreadcrumbItems(title);

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
                                {paginated.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        variant={product.cardVariant}
                                    />
                                ))}
                            </Styled.Products>
                            <Pagination
                                page={currentPage}
                                pageCount={pageCount}
                                onChange={setPage}
                            />
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
