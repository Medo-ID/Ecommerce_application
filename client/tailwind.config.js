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
      },
      boxShadow: {
        'custom-orange': '0 0 50px 12px rgba(253, 139, 81, 0.6)',
        'custom-teal': '0 0 50px 12px rgb(37, 113, 128, 0.6)'
      },
    },
  },
  plugins: [],
}

