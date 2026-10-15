import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' so the built `dist` folder works from any sub-path or straight from disk via a static server
export default defineConfig({
  plugins: [react()],
  base: './',
});
