/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    mode: 'jit', 
  theme: {
    extend: {colors: {
        primary: '#6366F1', // indigo-500
      },
    },
  },
  plugins: [],
};