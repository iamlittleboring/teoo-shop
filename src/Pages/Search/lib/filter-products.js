// De-duplicated category list across the whole catalog, in first-seen order.
const deriveAvailableCategories = (products) =>
    Array.from(
        new Map(
            products
                .flatMap((product) => product.categories || [])
                .filter((category) => category?.handle)
                .map((category) => [category.handle, category])
        ).values()
    );

const buildCategoryLabels = (categories) =>
    categories.reduce((acc, category) => {
        acc[category.handle] = category.name;
        return acc;
    }, {});

const filterAndSortProducts = (
    products,
    { availableCategoryHandles, categoryFilter, maxPrice, minPrice, query, sort }
) => {
    const min = minPrice ? Number(minPrice) : -Infinity;
    const max = maxPrice ? Number(maxPrice) : Infinity;

    let list = products.filter((product) => {
        const categoryAllowed =
            (product.categories || []).some((category) => categoryFilter[category.handle]) ||
            availableCategoryHandles.length === 0;
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
};

export { buildCategoryLabels, deriveAvailableCategories, filterAndSortProducts };
