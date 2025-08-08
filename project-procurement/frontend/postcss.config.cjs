// postcss.config.cjs
module.exports = {
  plugins: {
    // This is the correct plugin for Tailwind CSS v4:
    '@tailwindcss/postcss': {}, // IMPORTANT: This line changed!
    autoprefixer: {},
  }
}