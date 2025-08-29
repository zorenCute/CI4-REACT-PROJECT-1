// src/lib/ConfigProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeColors = {
  primary: string;
  primaryLight?: string;
  primaryDark?: string;
  secondary?: string;
};

type Config = {
  API_BASE_URL: string;
  THEME_COLORS?: ThemeColors;
};

const defaults: Config = {
  API_BASE_URL: 'http://localhost:8080',
  THEME_COLORS: {
    primary: '#4f46e5', // indigo-600
    primaryLight: '#818cf8', // indigo-400
    primaryDark: '#4338ca', // indigo-700
    secondary: '#4b5563' // gray-600
  }
};

interface ConfigContextType {
  config: Config;
  isLoading: boolean;
  updateTheme: (colors: ThemeColors) => void;
}

const ConfigContext = createContext<ConfigContextType>({
  config: defaults,
  isLoading: true,
  updateTheme: () => {}
});

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<Config>(defaults);
  const [isLoading, setIsLoading] = useState(true);

  // Function to update CSS variables
  const updateCssVariables = (colors: ThemeColors) => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-primary-light', colors.primaryLight || lightenColor(colors.primary, 20));
    root.style.setProperty('--color-primary-dark', colors.primaryDark || darkenColor(colors.primary, 20));
    root.style.setProperty('--color-secondary', colors.secondary || '#4b5563');
  };

  // Helper functions for light/dark variants
  const lightenColor = (hex: string, _percent: number): string => {
    // Implementation for lightening hex color
    return hex; // Simplified - use a color library in real implementation
  };

  const darkenColor = (hex: string, _percent: number): string => {
    // Implementation for darkening hex color
    return hex; // Simplified - use a color library in real implementation
  };

  useEffect(() => {
    let isMounted = true;

    const loadConfig = async () => {
      try {
        const res = await fetch('/runtime-config.json?t=' + Date.now(), {
          cache: 'no-store',
        });
        const json = await res.json();

        if (isMounted) {
          const newConfig = {
            API_BASE_URL: json.API_BASE_URL || import.meta.env.VITE_API_BASE_URL || defaults.API_BASE_URL,
            THEME_COLORS: json.THEME_COLORS || defaults.THEME_COLORS
          };
          
          setConfig(newConfig);
          updateCssVariables(newConfig.THEME_COLORS!);
          setIsLoading(false);
        }
      } catch (err) {
        console.warn('Falling back to env/default config:', err);
        if (isMounted) {
          setConfig(defaults);
          updateCssVariables(defaults.THEME_COLORS!);
          setIsLoading(false);
        }
      }
    };

    loadConfig();

    const interval = setInterval(loadConfig, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const updateTheme = (colors: ThemeColors) => {
    setConfig(prev => ({ ...prev, THEME_COLORS: colors }));
    updateCssVariables(colors);
  };

  return (
    <ConfigContext.Provider value={{ config, isLoading, updateTheme }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);