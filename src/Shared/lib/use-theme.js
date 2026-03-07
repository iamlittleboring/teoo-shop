import { useContext } from "react";

import { ThemeContext } from "./theme-context";

const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within ThemeContextProvider");
    }

    return context;
};

export { useTheme };
