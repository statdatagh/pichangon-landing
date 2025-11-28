import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // ✅ COLORES DE PICHANGON (basados en tu Flutter theme)
        pichangon: {
          // Dark Mode Colors
          'dark-bg': '#1A5A3E',
          'dark-card': '#2B6B4F',
          
          // Light Mode Colors
          'light-bg': '#FBFBFB',
          'light-card': '#FFFFFF',
          'dark-green': '#003000',
          'medium-grey': '#666666',
          
          // Principal & Green variations
          'accent': '#10B981',
          'green-dark': '#0C3E2F',
          'green-medium': '#2B6B4F',
          'green-light': '#B3E5BC',
          
          // Additional Colors
          'blue-light': '#3B82F6',
          'yellow-warn': '#F59E0B',
          'yellow-warn-dark': '#D97706',
          'alert-red': '#CC0000',
          
          // Gradientes de fondo oscuro
          'gradient-dark-top': '#1F5438',
          'gradient-dark-center': '#163F2C',
          'gradient-dark-bottom': '#0A1F15',
          
          // Gradientes de fondo claro
          'gradient-light-top': '#FAFBFA',
          'gradient-light-bottom': '#F5F7F6',
          
          // Gradiente para cards oscuro
          'card-gradient-dark-start': '#2D5F47',
          'card-gradient-dark-end': '#1F4A37',
          
          // Gradiente para cards claro
          'card-gradient-light': '#F0FDF4',
          
          // Glassmorphism
          'glass-05': 'rgba(16, 185, 129, 0.05)',
          'glass-08': 'rgba(56, 142, 60, 0.08)',
          'glass-10': 'rgba(16, 185, 129, 0.10)',
          'glass-12': 'rgba(16, 185, 129, 0.12)',
          'glass-15': 'rgba(56, 142, 60, 0.15)',
          'glass-18': 'rgba(16, 185, 129, 0.18)',
          'glass-20': 'rgba(56, 142, 60, 0.20)',
          'glass-25': 'rgba(56, 142, 60, 0.25)',
          'glass-30': 'rgba(56, 142, 60, 0.30)',
          'glass-40': 'rgba(56, 142, 60, 0.40)',
          'glass-45': 'rgba(56, 142, 60, 0.45)',
          'glass-border': 'rgba(255, 255, 255, 0.15)',
          'glass-shimmer': 'rgba(255, 255, 255, 0.10)',
        },
        
        // ✅ Shadcn UI colors (compatibilidad)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      backgroundImage: {
        // ✅ GRADIENTES PERSONALIZADOS
        'gradient-dark': 'linear-gradient(180deg, #1F5438 0%, #163F2C 50%, #0A1F15 100%)',
        'gradient-light': 'linear-gradient(180deg, #FAFBFA 0%, #F5F7F6 100%)',
        'gradient-card-dark': 'linear-gradient(135deg, #2D5F47 0%, #1F4A37 100%)',
        'gradient-card-light': 'linear-gradient(135deg, rgba(240, 253, 244, 0.5) 0%, rgba(240, 253, 244, 0.3) 100%)',
        'gradient-bottom-nav-dark': 'linear-gradient(180deg, rgba(10, 31, 21, 0.95) 0%, #0A1F15 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config