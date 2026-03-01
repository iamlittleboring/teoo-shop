import { getProducts } from "@entities/ProductCard/api";

const fetchProducts = async () => {
    try {
        return await getProducts();
    } catch {
        throw new Error("Failed to load products");
    }
};

export { fetchProducts };
