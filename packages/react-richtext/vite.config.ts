import { defineConfig } from 'vite';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'vite-plugin-dts';

/* https://vitejs.dev/config/ */
export default defineConfig({
  plugins: [peerDepsExternal(), dts()],
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.tsx',
      name: 'lib',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
  },
});
