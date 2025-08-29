// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Remove mode: 'jit' or keep it but restart server
  theme: {
    extend: {
      
      colors: {
        primary: '#6366F1',
      },
    },
  },
  plugins: [],
};