/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shell: '#F0F0F0',      // Light gray outer container
        surface: '#FFFFFF',    // Pure white cards
        primary: '#111827',    // Near black text/active fills
        muted: {
          DEFAULT: '#6B7280',  // Secondary text
          light: '#9CA3AF',    // Placeholder/lighter text
        },
        divider: '#E5E7EB',    // Borders/Dividers
        status: {
          pending: '#FFF7ED',  // Amber tint
          progress: '#EFF6FF', // Blue tint
          must: '#EF4444',     // Red MoSCoW
          should: '#7C3AED',   // Purple MoSCoW
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'ambient': '0 2px 12px rgba(0,0,0,0.06)', // Elevated cards without borders
      },
      borderRadius: {
        'card-lg': '20px',     // Main bento cards
        'card-sm': '14px',     // Sub-cards/inner elements
        'pill': '999px',       // Buttons, filters, toggles
      },
      letterSpacing: {
        'tight-hdr': '-0.02em',
      },
      borderWidth: {
        '1.5': '1.5px',
      }
    },
  },
  plugins: [],
}
