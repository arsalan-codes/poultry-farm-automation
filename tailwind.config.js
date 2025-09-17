/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Vazirmatn', 'system-ui', 'sans-serif'],
        persian: ['Vazirmatn', 'system-ui', 'sans-serif'],
        roboto: ['Roboto', 'system-ui', 'sans-serif'],
      },
      colors: {
        md: {
          primary: 'hsl(var(--md-primary))',
          'on-primary': 'hsl(var(--md-on-primary))',
          'primary-container': 'hsl(var(--md-primary-container))',
          'on-primary-container': 'hsl(var(--md-on-primary-container))',
          
          secondary: 'hsl(var(--md-secondary))',
          'on-secondary': 'hsl(var(--md-on-secondary))',
          'secondary-container': 'hsl(var(--md-secondary-container))',
          'on-secondary-container': 'hsl(var(--md-on-secondary-container))',
          
          tertiary: 'hsl(var(--md-tertiary))',
          'on-tertiary': 'hsl(var(--md-on-tertiary))',
          'tertiary-container': 'hsl(var(--md-tertiary-container))',
          'on-tertiary-container': 'hsl(var(--md-on-tertiary-container))',
          
          error: 'hsl(var(--md-error))',
          'on-error': 'hsl(var(--md-on-error))',
          'error-container': 'hsl(var(--md-error-container))',
          'on-error-container': 'hsl(var(--md-on-error-container))',
          
          surface: 'hsl(var(--md-surface))',
          'on-surface': 'hsl(var(--md-on-surface))',
          'surface-variant': 'hsl(var(--md-surface-variant))',
          'on-surface-variant': 'hsl(var(--md-on-surface-variant))',
          
          'surface-container': 'hsl(var(--md-surface-container))',
          'surface-container-low': 'hsl(var(--md-surface-container-low))',
          'surface-container-high': 'hsl(var(--md-surface-container-high))',
          'surface-container-highest': 'hsl(var(--md-surface-container-highest))',
          
          outline: 'hsl(var(--md-outline))',
          'outline-variant': 'hsl(var(--md-outline-variant))',
        },
      },
      spacing: {
        'md-1': 'var(--md-spacing-1)',
        'md-2': 'var(--md-spacing-2)',
        'md-3': 'var(--md-spacing-3)',
        'md-4': 'var(--md-spacing-4)',
        'md-5': 'var(--md-spacing-5)',
        'md-6': 'var(--md-spacing-6)',
        'md-8': 'var(--md-spacing-8)',
        'md-10': 'var(--md-spacing-10)',
        'md-12': 'var(--md-spacing-12)',
        'md-16': 'var(--md-spacing-16)',
      },
      borderRadius: {
        'md-xs': 'var(--md-radius-xs)',
        'md-sm': 'var(--md-radius-sm)',
        'md-md': 'var(--md-radius-md)',
        'md-lg': 'var(--md-radius-lg)',
        'md-xl': 'var(--md-radius-xl)',
      },
      boxShadow: {
        'md-1': 'var(--md-elevation-1)',
        'md-2': 'var(--md-elevation-2)',
        'md-3': 'var(--md-elevation-3)',
        'md-4': 'var(--md-elevation-4)',
        'md-5': 'var(--md-elevation-5)',
      },
      screens: {
        'xs': '360px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}