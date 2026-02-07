/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#D62300",
        secondary: "#502314",
        accent: "#F5EBDC",
        "header-bg": "#F9F4ED",
        "background-light": "#F5EBDC",
        "background-dark": "#2D1006",
      },
      fontFamily: {
        display: ["Titan One", "cursive"],
        body: ["Open Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
}

