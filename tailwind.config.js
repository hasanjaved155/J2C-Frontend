/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: '#03000f',
        lightBlue: '#43a6c6',
        darkGray: '#333',
        whitesmoke: '#f5f5f5',
      },
      transitionProperty: {
        'width': 'width'
      },
      rotate: {
        'y-180': 'rotateY(180deg)'
      },
      screens: {
        'custom-mid': '810px'
      },
    },
  },
  plugins: [require("daisyui")],
};
