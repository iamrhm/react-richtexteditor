import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts(),
  ],
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'lib',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      // into your library
      external: ['react'],
      output: {
        globals: {
          react: 'react',
        },
      },
    },
  },
})
