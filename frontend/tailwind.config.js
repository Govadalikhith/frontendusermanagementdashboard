/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#060913',
          surface: 'rgba(13, 20, 38, 0.6)',
          card: 'rgba(20, 30, 55, 0.45)',
          hover: 'rgba(30, 41, 73, 0.7)',
          primary: '#8b5cf6',
          secondary: '#06b6d4',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

