import { useContext } from "react";

import { FavoritesContext } from "./favorites-context";

const useFavorites = () => {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error("useFavorites must be used within FavoritesProvider");
    }

    return context;
};

export { useFavorites };
