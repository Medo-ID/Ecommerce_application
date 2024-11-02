/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainOrange: "#FD8B51",
        mainTeal: "#257180",
        mainBg: "#FAF7F0"
      }
    },
  },
  plugins: [],
}

