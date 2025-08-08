

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
    resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'], // ← add this
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
})
