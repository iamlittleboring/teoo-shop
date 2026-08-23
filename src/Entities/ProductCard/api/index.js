import { resolveRegionId, sdk } from "@shared/lib/medusa";

// Cards (Home/Search/related-products grids) only ever read a variant's id
// and price, never its per-variant options — so the list fetch skips
// `*options`/`*variants.options` and only the single-product detail fetch
// (which drives the option picker) pays for them.
const STORE_PRODUCT_LIST_FIELDS = [
    "*collection",
    "*images",
    "*type",
    "*categories",
    "*variants",
    "*variants.prices",
    "*variants.calculated_price",
    "+variants.inventory_quantity",
    "+variants.manage_inventory",
    "+thumbnail",
].join(",");
const STORE_PRODUCT_DETAIL_FIELDS = [STORE_PRODUCT_LIST_FIELDS, "*options", "*variants.options"].join(
    ","
);
// A price list ("Sale" type, set up in the Medusa admin — no promo code
// involved) makes `calculated_amount` drop below `original_amount` for the
// products/variants it covers. When there's no active discount the two are
// equal, so `originalPrice` naturally stays null and no "was" price shows.
const getVariantPrice = (variant) => {
    const calculatedAmount = Number(variant?.calculated_price?.calculated_amount);
    const originalAmount = Number(variant?.calculated_price?.original_amount);
    const hasDiscount =
        Number.isFinite(originalAmount) &&
        Number.isFinite(calculatedAmount) &&
        originalAmount > calculatedAmount;

    if (Number.isFinite(calculatedAmount)) {
        return { price: calculatedAmount, originalPrice: hasDiscount ? originalAmount : null };
    }

    const firstPriceAmount = Number(variant?.prices?.[0]?.amount);
    return { price: Number.isFinite(firstPriceAmount) ? firstPriceAmount : 0, originalPrice: null };
};

// Inventory that isn't tracked at all (`manage_inventory: false`) means the
// variant is always orderable — only a *tracked* quantity of zero counts as
// out of stock.
const isVariantInStock = (variant) =>
    variant?.manage_inventory === false || Number(variant?.inventory_quantity) > 0;

const mapVariant = (variant) => ({
    id: variant?.id || null,
    title: variant?.title || "",
    ...getVariantPrice(variant),
    inStock: isVariantInStock(variant),
    options: (variant?.options || []).map((option) => ({
        title: option?.option?.title || "",
        value: option?.value ?? "",
    })),
});

const mapProduct = (product) => {
    const variants = (product?.variants || []).map(mapVariant);
    const sortedVariants = [...variants].sort((a, b) => a.price - b.price);
    const images = [...new Set((product?.images || []).map((image) => image?.url).filter(Boolean))];
    const categories = (product?.categories || []).map((category) => ({
        id: category.id,
        name: category.name,
        handle: category.handle,
    }));
    const fingerprint = [
        product?.collection?.handle,
        product?.collection?.title,
        product?.type?.value,
        product?.type?.name,
        ...categories.flatMap((category) => [category.handle, category.name]),
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

    return {
        id: product.id,
        name: product.title,
        description: product.description || "",
        price: sortedVariants[0]?.price || 0,
        originalPrice: sortedVariants[0]?.originalPrice || null,
        categories,
        collection: product?.collection
            ? {
                  id: product.collection.id,
                  name: product.collection.title || product.collection.name,
                  slug: product.collection.handle,
              }
            : null,
        cardVariant: fingerprint.includes("hood")
            ? "street"
            : fingerprint.includes("accessor") ||
                fingerprint.includes("cap") ||
                fingerprint.includes("bag")
              ? "clean"
              : "classic",
        image: images[0] || product?.thumbnail || "",
        variantId: sortedVariants[0]?.id || null,
        inStock: sortedVariants[0]?.inStock ?? true,
        images,
        variants,
        options: (product?.options || []).map((option) => ({
            id: option?.id,
            title: option?.title || "",
            values: [
                ...new Set((option?.values || []).map((value) => value?.value).filter(Boolean)),
            ],
        })),
    };
};

const PRODUCTS_PAGE_SIZE = 100;

// A flat `limit: 100` silently dropped every product past the first page —
// the catalog pages filter/sort client-side over the full list, so anything
// beyond that cap just vanished with no error and no indication. Paging
// through `count` here keeps that client-side approach but guarantees the
// full catalog is actually loaded first.
const getProducts = async () => {
    const regionId = await resolveRegionId();
    const products = [];
    let offset = 0;
    let count = Infinity;

    while (offset < count) {
        const response = await sdk.store.product.list({
            fields: STORE_PRODUCT_LIST_FIELDS,
            limit: PRODUCTS_PAGE_SIZE,
            offset,
            region_id: regionId,
        });

        products.push(...(response.products || []));
        count = response.count ?? products.length;
        offset += PRODUCTS_PAGE_SIZE;

        if (!response.products?.length) break;
    }

    return products.map(mapProduct);
};

const getProductById = async (id) => {
    const regionId = await resolveRegionId();
    const { product } = await sdk.store.product.retrieve(id, {
        fields: STORE_PRODUCT_DETAIL_FIELDS,
        region_id: regionId,
    });

    return product ? mapProduct(product) : null;
};

export { getProducts, getProductById };
