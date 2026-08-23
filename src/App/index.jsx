import { Analytics } from "@vercel/analytics/react";
import { RouterProvider } from "react-router-dom";

import { AuthProvider, CartProvider, ThemeContextProvider } from "@shared/lib";

import router from "./router";
import { AppThemeProvider } from "./theme";

const App = () => {
    return (
        <ThemeContextProvider>
            <AuthProvider>
                <CartProvider>
                    <AppThemeProvider>
                        <RouterProvider router={router} />
                        <Analytics />
                    </AppThemeProvider>
                </CartProvider>
            </AuthProvider>
        </ThemeContextProvider>
    );
};

export default App;
