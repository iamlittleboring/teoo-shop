import { createContext, useContext, useMemo, useState } from "react";

import { darkTheme, lightTheme } from "@shared/config";

const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => setIsDarkMode((prev) => !prev);

    const value = useMemo(
        () => ({
            isDarkMode,
            toggleTheme,
            theme: isDarkMode ? darkTheme : lightTheme,
        }),
        [isDarkMode]
    );

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within ThemeContextProvider");
    }

    return context;
};

export { ThemeContextProvider, useTheme };
