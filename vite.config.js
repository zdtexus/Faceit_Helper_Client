import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import compression from 'vite-plugin-compression';
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
  plugins: [
    Inspect(),
    react(),
    compression({
      verbose: true,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  build: {
    port: 4000,
    outDir: 'dist',
    cssCodeSplit: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
              return 'redux';
            }
            if (id.includes('@nextui-org/react')) {
              return 'nextui';
            }
            if (id.includes('react-router-dom')) {
              return 'react-router';
            }
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    open: true,
    port: 3000,
  },
});
