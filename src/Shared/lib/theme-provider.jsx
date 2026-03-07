import { useMemo, useState } from "react";

import { darkTheme, lightTheme } from "@shared/config";

import { ThemeContext } from "./theme-context";

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

export { ThemeContextProvider };
