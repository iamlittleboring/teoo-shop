import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "@entities/ProductCard/api";
import { ProductCard } from "@entities/ProductCard";
import { Text, Title } from "@shared/styles";

import Styled from "./styled";

const SearchPage = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const query = (searchParams.get("q") || "").trim().toLowerCase();
    const categoryLabels = {
        tshirts: t("searchPage.categories.tshirts"),
        hoodies: t("searchPage.categories.hoodies"),
        accessories: t("searchPage.categories.accessories"),
    };

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [sort, setSort] = useState("relevance");
    const [categoryFilter, setCategoryFilter] = useState({
        tshirts: true,
        hoodies: true,
        accessories: true,
    });
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => {
        let isMounted = true;

        getProducts()
            .then((response) => {
                if (isMounted) {
                    setProducts(response);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

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

    if (isLoading) {
        return (
            <Styled.Shell>
                <Text>{t("common.loadingSearch")}</Text>
            </Styled.Shell>
        );
    }

    return (
        <Styled.Shell>
            <Title>{t("searchPage.title")}</Title>
            <Styled.Top>
                <Styled.Count>
                    {query
                        ? t("searchPage.resultCountFor", {
                              count: filtered.length,
                              query,
                          })
                        : t("searchPage.resultCount", { count: filtered.length })}
                </Styled.Count>
                <Styled.SortSelect
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
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

                <Styled.Sidebar>
                    <Styled.FilterBlock>
                        <Styled.FilterTitle>{t("searchPage.category")}</Styled.FilterTitle>
                        {Object.entries(categoryLabels).map(([key, label]) => (
                            <Styled.CheckboxLabel key={key}>
                                <input
                                    type="checkbox"
                                    checked={categoryFilter[key]}
                                    onChange={(event) =>
                                        setCategoryFilter((prev) => ({
                                            ...prev,
                                            [key]: event.target.checked,
                                        }))
                                    }
                                />
                                {label}
                            </Styled.CheckboxLabel>
                        ))}
                    </Styled.FilterBlock>

                    <Styled.FilterBlock>
                        <Styled.FilterTitle>{t("searchPage.priceRange")}</Styled.FilterTitle>
                        <Styled.RangeRow>
                            <Styled.Field
                                type="number"
                                min="0"
                                placeholder={t("searchPage.min")}
                                value={minPrice}
                                onChange={(event) => setMinPrice(event.target.value)}
                            />
                            <Styled.Field
                                type="number"
                                min="0"
                                placeholder={t("searchPage.max")}
                                value={maxPrice}
                                onChange={(event) => setMaxPrice(event.target.value)}
                            />
                        </Styled.RangeRow>
                    </Styled.FilterBlock>

                    <Styled.ResetButton
                        type="button"
                        onClick={() => {
                            setCategoryFilter({
                                tshirts: true,
                                hoodies: true,
                                accessories: true,
                            });
                            setMinPrice("");
                            setMaxPrice("");
                            setSort("relevance");
                        }}
                    >
                        {t("searchPage.reset")}
                    </Styled.ResetButton>
                </Styled.Sidebar>
            </Styled.Layout>
        </Styled.Shell>
    );
};

export default SearchPage;
