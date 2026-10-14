/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FDFBF7',
        secondary: '#F3EFE6',
        gold: '#C28E3A',
        brown: '#8A5A32',
        cream: '#FAF8F5',
        'text-primary': '#2D2318',
        'text-secondary': '#5C4D3C',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
