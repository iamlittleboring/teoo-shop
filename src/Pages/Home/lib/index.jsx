import { useEffect, useState } from "react";

import { fetchProducts } from "../api";

const useLoadProducts = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetchProducts();

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

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    return { data, error, isLoading };
};

export { useLoadProducts };
