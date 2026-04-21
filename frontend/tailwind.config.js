/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4F46E5', // Brand Indigo
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        success: {
          DEFAULT: '#10B981', // Success Emerald
        },
        surface: {
          DEFAULT: '#FFFFFF', // Pure white cards
          muted: '#F9FAFB',   // App background
        },
        border: {
          DEFAULT: '#E5E7EB', // Hairline borders
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'ambient-sm': '0 1px 2px rgba(0,0,0,0.04)',
        'ambient': '0 1px 3px rgba(0,0,0,0.06), 0 10px 15px -3px rgba(0,0,0,0.03)',
        'ambient-lg': '0 4px 6px -1px rgba(0,0,0,0.05), 0 20px 25px -5px rgba(0,0,0,0.03)',
      },
      transitionTimingFunction: {
        'micro-spring': 'cubic-bezier(0.4, 0, 0.2, 1)', 
      },
      transitionDuration: {
        'fast': '150ms',
      }
    },
  },
  plugins: [],
}