/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
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
      screens: {
        "custom-400": "400px",
        "custom-420": "420px",
        "custom-700": "700px",
        "custom-mid": "810px",
        "custom-1000": "1000px",
        "custom-1050": "1050px",
        "custom-950": "950px",
      },

    },
  },
  plugins: [require("daisyui")],
};
