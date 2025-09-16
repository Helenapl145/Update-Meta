/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ajusta conforme seu projeto
  ],
  theme: {
    extend: {
      colors:{
      primary: '#007167',
      button: '#D2FFFB',
      secondary: '#8CCDBA',
      area: '#EEEEEE'
      }
    },
  },
  plugins: [],
}
