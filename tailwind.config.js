/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1a2e',
          light: '#0f3460',
          accent: '#e94560'
        },
        text: {
          primary: '#f8f9fa',
          secondary: '#e9ecef',
          muted: '#dee2e6'
        },
        navy: '#1a1a2e',
        electricBlue: '#0f3460',
        vibrantRed: '#e94560',
        lightGray: '#f8f9fa',
        softWhite: '#ffffff',
        dark: {
          primary: '#0F172A',
          secondary: '#1E293B',
          accent: '#38BDF8'
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(0, 0, 0, 0.1)',
          border: 'rgba(255, 255, 255, 0.05)',
          background: 'rgba(26, 26, 46, 0.8)',
          hover: 'rgba(255, 255, 255, 0.05)'
        }
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Work Sans', 'sans-serif'],
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
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-light': 'bounce 1s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-in': 'slideIn 0.5s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(56, 189, 248, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(56, 189, 248, 0.8)' }
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 }
        }
      }
    }
  },
  plugins: [],
};