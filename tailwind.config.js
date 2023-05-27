/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'blue': '#5398FF',
      'green': '#20DB33',
      'red': '#FF4444',
      'yellow': 'F6F95B'
    },
  },
  plugins: [],
  prefix: 'tw-',
}

