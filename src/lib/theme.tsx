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
      
      // Apply theme immediately to both html and body
      const htmlElement = document.documentElement;
      const bodyElement = document.body;
      
      if (initialTheme === 'dark') {
        htmlElement.classList.add('dark');
        bodyElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
        bodyElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      
      // Apply theme change immediately to both html and body
      const htmlElement = document.documentElement;
      const bodyElement = document.body;
      
      if (newTheme === 'dark') {
        htmlElement.classList.add('dark');
        bodyElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
        bodyElement.classList.remove('dark');
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
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