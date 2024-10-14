// ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { DefaultTheme, MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';

type ThemeContextType = {
  isDarkTheme: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const theme = isDarkTheme ? MD3DarkTheme : DefaultTheme;

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
