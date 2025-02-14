/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff1493',    // розовый
        secondary: '#ffd700',   // золотой
        dark: '#000000',       // черный
        'pink-light': '#ff69b4' // светло-розовый
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom, #000000, #1a0010)',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}