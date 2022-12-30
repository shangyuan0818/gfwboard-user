import { defineConfig, splitVendorChunkPlugin } from "vite";
import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import image from "@rollup/plugin-image";

const manualChunks: Record<string, string[]> = {
  react: ["react", "react-dom"],
  router: ["react-router", "react-router-dom"],
  "mui-base": ["@emotion", "@mui/base", "@mui/system"],
  mui: ["@mui/material"],
  "mui-plugin": ["@mui/lab", "@mui/x-date-pickers", "tss-react", "@mui/icons-material"],
  "mui-third-party": ["mui-markdown", "markdown-to-jsx", "notistack"],
  carousel: ["react-material-ui-carousel", "framer-motion"],
  ant: ["@ant-design"],
  ahooks: ["ahooks", "@ahooksjs"],
  axios: ["axios"],
  lodash: ["lodash-es"],
  redux: ["redux", "react-redux", "@reduxjs/toolkit"],
  formik: ["formik", "yup"],
  i18n: ["i18next", "react-i18next", "i18next-browser-languagedetector"],
  prism: ["prism-react-renderer"],
  polyfill: ["core-js", "resize-observer-polyfill"]
};

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
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        manualChunks: (meta) => {
          if (meta.includes("node_modules")) {
            for (const [name, pkgs] of Object.entries(manualChunks)) {
              for (const pkg of pkgs) {
                if (meta.includes(`/node_modules/${pkg}/`)) {
                  return name;
                }
              }
            }

            return "vendor";
          }

          if (meta.includes("src")) {
            return "app";
          }

          return "shared";
        },
        chunkFileNames: "static/js/[name].[hash:12].chunk.js",
        entryFileNames: "static/js/[name].[hash:12].js",
        assetFileNames: (info) => {
          if (["css", "sass", "scss"].some((ext) => info.name?.endsWith("." + ext))) {
            return "static/css/[name].[hash:12].css";
          }

          if (["png", "jpg", "jpeg", "gif", "svg"].some((ext) => info.name?.endsWith("." + ext))) {
            return "static/img/[name].[hash:12].[ext]";
          }

          return "static/media/[name].[hash:12].[ext]";
        }
      }
    }
  }
});
