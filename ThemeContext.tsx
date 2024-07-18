import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, DarkTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';

interface ThemeContextProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps>({
  isDarkTheme: true, // Default to dark mode
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Default to dark mode

  useEffect(() => {
    const loadTheme = async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (theme) {
        setIsDarkTheme(theme === 'dark');
      } else {
        // If no theme is set in storage, use the system preference
        setIsDarkTheme(Appearance.getColorScheme() === 'dark');
      }
    };

    const appearanceListener = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkTheme(colorScheme === 'dark');
    });

    loadTheme();

    return () => appearanceListener.remove();
  }, []);

  const toggleTheme = async () => {
    const newTheme = isDarkTheme ? 'light' : 'dark';
    setIsDarkTheme(!isDarkTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <NavigationThemeProvider value={isDarkTheme ? DarkTheme : DefaultTheme}>
        {children}
      </NavigationThemeProvider>
    </ThemeContext.Provider>
  );
};
