import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import legacy from '@vitejs/plugin-legacy';
import image from '@rollup/plugin-image';

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    image(),
    splitVendorChunkPlugin()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      lodash: 'lodash-es'
    }
  },
  server: {
    port: 3000
  }
});
