// src/context/ThemeContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react"; // Explicit type-only import

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  isMounted: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    setTheme(savedTheme === "light" || savedTheme === "dark" ? savedTheme : systemPrefersDark ? "dark" : "light");
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.className = theme;
      localStorage.setItem("theme", theme);
    }
  }, [theme, isMounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme, isMounted }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
