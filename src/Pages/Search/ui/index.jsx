import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { ProductCard } from "@entities/ProductCard";
import {
    BreadCrumbs,
    buildSearchBreadcrumbItems,
} from "@features/BreadCrumbs";
import {
    buildCategoryFilterMap,
    buildNextCategoriesValue,
    buildNextSearchParams,
    parseSearchQueryState,
    SearchFilters,
} from "@features/SearchFilters";
import { paginate, useProductsList } from "@shared/lib";
import { Container, Text } from "@shared/styles";
import LoadingState from "@shared/ui/LoadingState";
import Pagination from "@shared/ui/Pagination";
import SectionTitle from "@shared/ui/SectionTitle";
import Select from "@shared/ui/Select";

import { PRODUCTS_PER_PAGE } from "../config";
import { buildCategoryLabels, deriveAvailableCategories, filterAndSortProducts } from "../lib/filter-products";
import Styled from "./styled";

const SearchPage = () => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: products, isLoading, error } = useProductsList();
    const availableCategories = useMemo(
        () => deriveAvailableCategories(products),
        [products]
    );
    const availableCategoryHandles = useMemo(
        () => availableCategories.map((category) => category.handle),
        [availableCategories]
    );

    const queryState = useMemo(
        () => parseSearchQueryState(searchParams, availableCategoryHandles),
        [availableCategoryHandles, searchParams]
    );

    const { maxPrice, minPrice, query, rawQuery, selectedCategories, sort } =
        queryState;

    const categoryFilter = useMemo(
        () => buildCategoryFilterMap(selectedCategories, availableCategoryHandles),
        [availableCategoryHandles, selectedCategories]
    );

    const categoryLabels = useMemo(
        () => buildCategoryLabels(availableCategories),
        [availableCategories]
    );

    const applyParamsPatch = (patch) => {
        const next = buildNextSearchParams(searchParams, patch);
        setSearchParams(next);
    };

    const handleSortChange = (event) => {
        const nextSort = event.target.value === "relevance" ? null : event.target.value;
        applyParamsPatch({ sort: nextSort });
    };

    const handleCategoryChange = (event) => {
        const categoryKey = event.target.name;
        const isChecked = event.target.checked;
        const categoryValue = buildNextCategoriesValue(
            selectedCategories,
            categoryKey,
            isChecked,
            availableCategoryHandles
        );

        applyParamsPatch({ category: categoryValue });
    };

    const handleMinPriceChange = (event) => {
        applyParamsPatch({ min: event.target.value || null });
    };

    const handleMaxPriceChange = (event) => {
        applyParamsPatch({ max: event.target.value || null });
    };

    const handleResetFilters = () => {
        applyParamsPatch({ sort: null, category: null, min: null, max: null });
    };

    const filtered = useMemo(
        () =>
            filterAndSortProducts(products, {
                availableCategoryHandles,
                categoryFilter,
                maxPrice,
                minPrice,
                query,
                sort,
            }),
        [availableCategoryHandles, categoryFilter, maxPrice, minPrice, products, query, sort]
    );

    const [page, setPage] = useState(1);

    // Any change to the URL-driven filters/sort/query invalidates whatever
    // page the user was on — jumping back to page 1 avoids landing on a now
    // out-of-range or unrelated page of results.
    useEffect(() => {
        setPage(1);
    }, [searchParams]);

    const { pageCount, currentPage, pageItems: paginated } = paginate(
        filtered,
        page,
        PRODUCTS_PER_PAGE
    );

    const resultLabel = query
        ? t("searchPage.resultCountFor", { count: filtered.length, query: rawQuery })
        : t("searchPage.resultCount", { count: filtered.length });
    const breadcrumbItems = buildSearchBreadcrumbItems(t("searchPage.title"));

    if (isLoading) {
        return (
            <section>
                <Container>
                    <LoadingState message={t("common.loadingSearch")} fullPage />
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
                    <BreadCrumbs items={breadcrumbItems} />
                </Container>
            </section>
            <section>
                <Container>
                    <SectionTitle>{t("searchPage.title")}</SectionTitle>
                    <Styled.Top>
                        <Styled.Count>{resultLabel}</Styled.Count>
                        <Select
                            value={sort}
                            onChange={handleSortChange}
                            aria-label={t("searchPage.sortAria")}
                        >
                            <option value="relevance">{t("searchPage.sortRelevance")}</option>
                            <option value="price-asc">{t("searchPage.sortPriceAsc")}</option>
                            <option value="price-desc">{t("searchPage.sortPriceDesc")}</option>
                            <option value="name">{t("searchPage.sortName")}</option>
                        </Select>
                    </Styled.Top>

                    <Styled.Layout>
                        <div>
                            {filtered.length === 0 ? (
                                <Styled.Empty>
                                    <Text>{t("searchPage.empty")}</Text>
                                </Styled.Empty>
                            ) : (
                                <>
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
                            )}
                        </div>

                        <SearchFilters
                            categoryFilter={categoryFilter}
                            categoryLabels={categoryLabels}
                            titleCategory={t("searchPage.category")}
                            titlePriceRange={t("searchPage.priceRange")}
                            minPlaceholder={t("searchPage.min")}
                            maxPlaceholder={t("searchPage.max")}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            onCategoryChange={handleCategoryChange}
                            onMinPriceChange={handleMinPriceChange}
                            onMaxPriceChange={handleMaxPriceChange}
                            onReset={handleResetFilters}
                            resetLabel={t("searchPage.reset")}
                        />
                    </Styled.Layout>
                </Container>
            </section>
        </>
    );
};

export default SearchPage;
