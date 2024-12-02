import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "./", //https://github.com/vitejs/vite/discussions/13910
  base: '/game-country-clash/',
});
