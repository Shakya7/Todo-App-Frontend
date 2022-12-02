/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens:{
        "xxl":"1387px"
      },
      fontFamily:{
        fascinate:['"Fascinate","ui-sans-serif"']
      }
    }
  },
  plugins: [],
}
