import { Analytics } from "@vercel/analytics/react";
import { RouterProvider } from "react-router-dom";

import { CartProvider, FavoritesProvider, ThemeContextProvider } from "@shared/lib";

import { Router } from "./router";
import { AppThemeProvider } from "./theme";

const App = () => {
    return (
        <ThemeContextProvider>
            <FavoritesProvider>
                <CartProvider>
                    <AppThemeProvider>
                        <RouterProvider router={Router} />
                        <Analytics />
                    </AppThemeProvider>
                </CartProvider>
            </FavoritesProvider>
        </ThemeContextProvider>
    );
};

export default App;
