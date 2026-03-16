import { useMemo } from "react";
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
import { useProductsList } from "@shared/lib";
import { Container, Text } from "@shared/styles";
import SectionTitle from "@shared/ui/SectionTitle";

import Styled from "./styled";

const SearchPage = () => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: products, isLoading, error } = useProductsList();

    const queryState = useMemo(
        () => parseSearchQueryState(searchParams),
        [searchParams]
    );

    const { maxPrice, minPrice, query, rawQuery, selectedCategories, sort } =
        queryState;

    const categoryFilter = useMemo(
        () => buildCategoryFilterMap(selectedCategories),
        [selectedCategories]
    );

    const categoryLabels = useMemo(
        () => ({
            tshirts: t("searchPage.categories.tshirts"),
            hoodies: t("searchPage.categories.hoodies"),
            accessories: t("searchPage.categories.accessories"),
        }),
        [t]
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
            isChecked
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

    const filtered = useMemo(() => {
        const min = minPrice ? Number(minPrice) : -Infinity;
        const max = maxPrice ? Number(maxPrice) : Infinity;

        let list = products.filter((product) => {
            const categoryAllowed = categoryFilter[product.category];
            const inPrice = product.price >= min && product.price <= max;
            const inQuery =
                !query ||
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query);

            return categoryAllowed && inPrice && inQuery;
        });

        if (sort === "price-asc") {
            list = [...list].sort((a, b) => a.price - b.price);
        } else if (sort === "price-desc") {
            list = [...list].sort((a, b) => b.price - a.price);
        } else if (sort === "name") {
            list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        }

        return list;
    }, [categoryFilter, maxPrice, minPrice, products, query, sort]);

    const resultLabel = query
        ? t("searchPage.resultCountFor", { count: filtered.length, query: rawQuery })
        : t("searchPage.resultCount", { count: filtered.length });
    const breadcrumbItems = buildSearchBreadcrumbItems(t("searchPage.title"));

    if (isLoading) {
        return (
            <section>
                <Container>
                    <Text>{t("common.loadingSearch")}</Text>
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
                        <Styled.SortSelect
                            value={sort}
                            onChange={handleSortChange}
                            aria-label={t("searchPage.sortAria")}
                        >
                            <option value="relevance">{t("searchPage.sortRelevance")}</option>
                            <option value="price-asc">{t("searchPage.sortPriceAsc")}</option>
                            <option value="price-desc">{t("searchPage.sortPriceDesc")}</option>
                            <option value="name">{t("searchPage.sortName")}</option>
                        </Styled.SortSelect>
                    </Styled.Top>

                    <Styled.Layout>
                        <div>
                            {filtered.length === 0 ? (
                                <Styled.Empty>
                                    <Text>{t("searchPage.empty")}</Text>
                                </Styled.Empty>
                            ) : (
                                <Styled.Products>
                                    {filtered.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            variant={product.cardVariant}
                                        />
                                    ))}
                                </Styled.Products>
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
