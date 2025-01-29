import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        remote: 'http://localhost:5001/assets/remoteEntry.js',
      },
      shared: {
        react: {
          requiredVersion: '^18.2.0',
          import: true
        },
        'react-dom': {
          requiredVersion: '^18.2.0',
          import: true
        },
        '@mui/material': {
          requiredVersion: '^5.0.0',
          import: true
        }
      },
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  preview: {
    port: 5000,
    strictPort: true,
  },
});