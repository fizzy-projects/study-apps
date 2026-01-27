import { useState, createContext } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [themeName, setThemeName] = useState("softSand");

    const toggleTheme = () => {
        setThemeName(prev => (prev === "softSand" ? "refreshing" : "softSand"));
    };

    // const theme = { name: themeName, toggleTheme };

    return (
        <ThemeContext.Provider value={{ themeName: themeName, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
}

