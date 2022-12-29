import { defineConfig, splitVendorChunkPlugin } from "vite";
import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import image from "@rollup/plugin-image";

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [react(), visualizer(), image(), splitVendorChunkPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      lodash: "lodash-es"
    }
  },
  server: {
    port: 3000
  },
  build: {
    outDir: "dist",
    assetsDir: "static",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router", "react-router-dom"],
          "mui-core": ["@emotion/react", "@emotion/styled", "@emotion/cache", "@mui/base", "@mui/system"],
          mui: ["@mui/material"],
          "mui-plugins": ["@mui/lab", "mui-markdown", "notistack", "@mui/x-date-pickers", "tss-react"],
          ant: ["@ant-design/icons", "@ant-design/colors"],
          ahooks: ["ahooks", "@ahooksjs/use-url-state"],
          axios: ["axios"],
          lodash: ["lodash-es"],
          redux: ["redux", "react-redux", "@reduxjs/toolkit"],
          formik: ["formik", "yup"]
        },
        chunkFileNames: "static/js/[name]-[hash].chunk.js"
      }
    }
  }
});
