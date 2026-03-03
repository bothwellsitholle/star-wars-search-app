import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: 'gzip', ext: '.gz' }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
