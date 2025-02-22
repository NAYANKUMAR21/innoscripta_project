import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Add this
    proxy: {}, // Add this empty proxy object
    allowedHosts: 'all',
  },
  build: { outDir: 'dist' },
});
