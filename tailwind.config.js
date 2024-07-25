/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'cross': "linear-gradient(rgba(216, 216, 216, 0.5),rgba(216, 216, 216, 0.5)),url('/src/image/cross.png')",
      }
    },
  },
  plugins: [],
}

