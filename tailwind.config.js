/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens:{
        "xxl":"1387px",
        "msm":"650px",
        "vsm":"560px",
        "xsm":"480px",
        "xxsm":"350px",
        "xxxsm":"250px",
        "apex-xsm":"230px"
        
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
      },
      fontSize:{
        filter:"2.5vw",
        updateTodoText:"4vw",
        title:"14vw",
        date:"5vw",
        addTask:"4vw",
        todoTitle:"7vw",
      },
  
    }
  },
  plugins: [],
}
