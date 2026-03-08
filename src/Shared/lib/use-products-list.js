import { useEffect, useState } from "react";

import { getProducts } from "@entities/ProductCard/api";

const useProductsList = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const loadProducts = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await getProducts();

                if (isMounted) {
                    setData(response);
                }
            } catch {
                if (isMounted) {
                    setError("Could not load products");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    return { data, error, isLoading };
};

export { useProductsList };
