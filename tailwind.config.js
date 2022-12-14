/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens:{
        "xxl":"1387px",
        "vsm":"560px",
        "xxxsm":"250px"
      },
      fontFamily:{
        fascinate:['"Fascinate","ui-sans-serif"'],
        nunito:['"Nunito","ui-sans-serif"']
      },
      width:{
        "w-auto": "75vw"
      },
      height:{
        "modal":"80vh",
        "8em":"8em"
      },
      minHeight:{
        "3/5":"40%"
      }
    }
  },
  plugins: [],
}
