/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bebas': ['Bebas Neue', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'racing-green': '#0F5132',
        'racing-green-light': '#1A7F5E',
        'racing-gold': '#F4A460',
        'racing-gold-light': '#F5B878',
      }
    },
  },
  plugins: [],
}