import { useEffect, useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { themes } from "./themes";

export function ThemeUpdater ({children}) {
    const { themeName } = useContext(ThemeContext);

    useEffect(() => {
        const root = document.documentElement;
        Object.entries(themes[themeName]).forEach(([key, value]) => {
        root.style.setProperty(key, value);
        });
    }, [themeName]);

    return (children); // This component only updates variables
}