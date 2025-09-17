'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      
      const initialTheme = savedTheme || systemTheme;
      setTheme(initialTheme);
      
      // Apply theme immediately to document elements
      applyTheme(initialTheme);
    }
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark') => {
    if (typeof window === 'undefined') return;
    
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    
    // Remove existing theme classes
    htmlElement.classList.remove('light', 'dark');
    bodyElement.classList.remove('light', 'dark');
    
    // Add new theme class
    htmlElement.classList.add(newTheme);
    bodyElement.classList.add(newTheme);
    
    // Set data attribute for CSS selectors
    htmlElement.setAttribute('data-theme', newTheme);
    
    // Force update of CSS custom properties
    if (newTheme === 'dark') {
      htmlElement.style.colorScheme = 'dark';
    } else {
      htmlElement.style.colorScheme = 'light';
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`theme-wrapper ${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}