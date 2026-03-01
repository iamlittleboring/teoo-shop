import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);

const FAVORITES_STORAGE_KEY = "teoo-shop-favorites";

const loadInitialFavorites = () => {
    if (typeof window === "undefined") {
        return [];
    }

    try {
        const stored = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const FavoritesProvider = ({ children }) => {
    const [items, setItems] = useState(loadInitialFavorites);

    useEffect(() => {
        window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const toggleFavorite = (product) => {
        setItems((prev) => {
            const exists = prev.some((item) => item.id === product.id);

            if (exists) {
                return prev.filter((item) => item.id !== product.id);
            }

            return [
                ...prev,
                {
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                },
            ];
        });
    };

    const isFavorite = (id) => items.some((item) => item.id === id);

    const removeFavorite = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearFavorites = () => {
        setItems([]);
    };

    const value = {
        items,
        favoritesCount: items.length,
        toggleFavorite,
        isFavorite,
        removeFavorite,
        clearFavorites,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};

const useFavorites = () => {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error("useFavorites must be used within FavoritesProvider");
    }

    return context;
};

export { FavoritesProvider, useFavorites };
