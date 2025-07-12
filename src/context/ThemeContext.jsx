import { createContext, useEffect, useState, useCallback } from "react";
import { storage } from "../utils/storage";
import { STORAGE_KEYS } from "../utils/constants";

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      return storage.get(STORAGE_KEYS.THEME) || "system";
    } catch (e) {
      return "system";
    }
  });

  useEffect(() => {
    const savedTheme = storage.get(STORAGE_KEYS.THEME) || "system";
    setTheme(savedTheme);
  }, []);

  const applyTheme = useCallback((currentTheme) => {
    const root = window.document.documentElement;
    const body = window.document.body;

    root.classList.remove("light", "dark");
    body.classList.remove("light", "dark");

    if (currentTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      body.classList.add(systemTheme);

      if (systemTheme === "dark") {
        root.classList.add("dark");
      }
    } else {
      root.classList.add(currentTheme);
      body.classList.add(currentTheme);

      if (currentTheme === "dark") {
        root.classList.add("dark");
      }
    }
  }, []);

  useEffect(() => {
    storage.set(STORAGE_KEYS.THEME, theme);
    applyTheme(theme);

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleSystemThemeChange = () => {
        applyTheme("system");
      };

      mediaQuery.addEventListener("change", handleSystemThemeChange);

      return () => {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      };
    }
  }, [theme, applyTheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      let nextTheme;
      if (prevTheme === "light") {
        nextTheme = "dark";
      } else if (prevTheme === "dark") {
        nextTheme = "system";
      } else {
        nextTheme = "light";
      }

      return nextTheme;
    });
  };

  const setSpecificTheme = (newTheme) => {
    if (["light", "dark", "system"].includes(newTheme)) {
      setTheme(newTheme);
    } else {
      return;
    }
  };

  const getEffectiveTheme = () => {
    if (theme === "system") {
      const effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      return effectiveTheme;
    }
    return theme;
  };

  const value = {
    theme,
    setTheme: setSpecificTheme,
    toggleTheme,
    getEffectiveTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
