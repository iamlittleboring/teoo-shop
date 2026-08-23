// Buckets products into one section per primary category, in first-seen
// order — products without a category fall into a single "products" catch-all.
const groupProductsByCategory = (products, fallbackTitle) => {
    const sections = products.reduce((acc, product) => {
        const primaryCategory = product.categories?.[0] || null;
        const key = primaryCategory?.handle || "products";

        if (!acc[key]) {
            acc[key] = {
                key,
                title: primaryCategory?.name || fallbackTitle,
                variant: product.cardVariant,
                items: [],
            };
        }

        acc[key].items.push(product);
        return acc;
    }, {});

    return Object.values(sections);
};

export { groupProductsByCategory };
