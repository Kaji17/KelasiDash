/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors:{
      'blueDark':'#07506A',
      'blueLight':'#036A8E',
      'green':'#39A74B',
      'greenLight':'rgba(57, 167, 75, 0.22)',
      'white': '#FFFFFF',
      'yellow': '#FFDC0E',
      'grey': '#8E98A8'
    },
    extend: {},
  },
  plugins: [],
}

