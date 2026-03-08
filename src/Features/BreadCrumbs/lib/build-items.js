const buildSearchBreadcrumbItems = (title) => [{ label: title }];

const buildCollectionBreadcrumbItems = (collectionName) => [
    { label: collectionName },
];

const buildProductBreadcrumbItems = ({
    collectionName,
    collectionSlug,
    productName,
    productTypeLabel,
    productTypeValue,
}) => [
    {
        label: collectionName,
        to: collectionSlug ? `/collection/${collectionSlug}` : undefined,
    },
    {
        label: productTypeLabel,
        to: `/search?category=${encodeURIComponent(productTypeValue || "")}`,
    },
    { label: productName },
];

export {
    buildCollectionBreadcrumbItems,
    buildProductBreadcrumbItems,
    buildSearchBreadcrumbItems,
};
