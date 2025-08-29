import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), [
    'VITE_', // Only expose VITE_ prefixed vars
    'PUBLIC_' // Optional: if you need public runtime vars
  ]);

  return {
    plugins: [tailwindcss()],
    
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
      alias: { '@': path.resolve(__dirname, './src') }
    },

    server: {
      open: true,
      proxy: mode === 'development' ? {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, '')
        }
      } : undefined
    },

    define: {
      // Only expose safe, public variables
      __DEV__: mode === 'development',
      __PUSHER_KEY__: JSON.stringify(env.VITE_PUSHER_APP_KEY),
      __PUSHER_CLUSTER__: JSON.stringify(env.VITE_PUSHER_APP_CLUSTER)
    },

    build: {
      assetsInclude: ['public/runtime-config.json'],
      rollupOptions: {
        external: ['/runtime-config.json'] // Ensure this isn't bundled
      }
    }
  };
});