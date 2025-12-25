/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // الألوان الأساسية
        primary: {
          DEFAULT: '#8B5CF6', // بنفسجي
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#6D28D9', // بنفسجي غامق
          foreground: '#FFFFFF',
        },
        // الألوان الوردية
        pink: {
          DEFAULT: '#EC4899',
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
        },
        rose: {
          DEFAULT: '#F43F5E',
          20: 'rgba(244, 63, 94, 0.2)',
        },
        'light-rose': {
          DEFAULT: '#FFF1F2',
          60: 'rgba(255, 241, 242, 0.6)',
        },
        // ألوان الخلفية والنص
        background: '#FFFFFF',
        foreground: '#1F2937',
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1F2937',
        },
        muted: {
          DEFAULT: '#F3F4F6',
          foreground: '#6B7280',
        },
        accent: {
          DEFAULT: '#F3E8FF',
          foreground: '#6D28D9',
        },
        border: '#E5E7EB',
        input: '#E5E7EB',
        ring: '#8B5CF6',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        'lg': '0.5rem',
        'md': '0.375rem',
        'sm': '0.25rem',
      },
    },
  },
  plugins: [],
}