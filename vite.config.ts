import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tailwindcss(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 75 },
      webp: { quality: 80 },
      avif: { quality: 70 },
      jpg: { quality: 75 },
      exclude: ['**/*.svg'],
      // etc
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/view': path.resolve(__dirname, './src/view'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/convex': path.resolve(__dirname, './convex'),
      '@/convex/_generated/api': path.resolve(__dirname, './convex/_generated/api'),
      '@/assets': path.resolve(__dirname, './public/assets'),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
});
