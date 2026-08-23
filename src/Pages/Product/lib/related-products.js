// "You may also like" — same collection or sharing at least one category,
// excluding the product itself.
const findRelatedProducts = (products, product, limit = 3) => {
    if (!product) {
        return [];
    }

    return products
        .filter(
            (item) =>
                item.id !== product.id &&
                (item.collection?.slug === product.collection?.slug ||
                    item.categories?.some((category) =>
                        product.categories?.some(
                            (productCategory) => productCategory.handle === category.handle
                        )
                    ))
        )
        .slice(0, limit);
};

export { findRelatedProducts };
