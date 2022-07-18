/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      lineHeight: {
        12: '3rem'
      },
      transitionProperty: {
        top: 'top'
      }
    },
    screens: {}
  },
  plugins: []
}
