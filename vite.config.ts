import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://gps.autotracker.group',
        changeOrigin: true,        
      },
    },
  },
  plugins: [react()],
});