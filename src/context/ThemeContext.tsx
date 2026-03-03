import { createContext, type ReactNode, useCallback, useEffect, useState } from 'react';
import { THEME_STORAGE_KEY } from '../constants';
import { Theme } from '../enums';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextValue | null>(null);

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === Theme.Light || stored === Theme.Dark) return stored;
  return Theme.Dark;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === Theme.Dark ? Theme.Light : Theme.Dark)),
    [],
  );

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
