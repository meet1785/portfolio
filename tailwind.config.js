/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1a1a',
          light: '#2d2d2d',
          accent: '#e07a5f'
        },
        text: {
          primary: '#f4f1de',
          secondary: '#e9ecef',
          muted: '#a8a5a1'
        },
        burnt: '#e07a5f',
        forest: '#3d5a3c',
        cream: '#f4f1de',
        charcoal: '#1a1a1a',
        terracotta: '#c1502e',
        olive: '#606c38',
        sand: '#dda15e',
        dark: {
          primary: '#0d1117',
          secondary: '#161b22',
          accent: '#e07a5f'
        },
        glass: {
          DEFAULT: 'rgba(244, 241, 222, 0.05)',
          dark: 'rgba(0, 0, 0, 0.2)',
          border: 'rgba(224, 122, 95, 0.15)',
          background: 'rgba(26, 26, 26, 0.8)',
          hover: 'rgba(224, 122, 95, 0.1)'
        }
      },
      fontFamily: {
        primary: ['DM Sans', 'sans-serif'],
        secondary: ['Playfair Display', 'serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        heading: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        h1: ['64px', '1.2'],
        h2: ['48px', '1.3'],
        h3: ['32px', '1.4'],
        body: ['16px', '1.6'],
        cta: ['18px', '1.3'],
      },
      spacing: {
        8: '8px',
        16: '16px',
        24: '24px',
        32: '32px',
        48: '48px',
        64: '64px',
        96: '96px',
      },
      backdropBlur: {
        xs: '2px',
      },
      backdropFilter: {
        'glass': 'blur(10px)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
        'glass-gradient-dark': 'linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.1))'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      }
    }
  },
  plugins: [],
};