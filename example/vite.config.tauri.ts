import { defineConfig, mergeConfig } from "vite";
import baseViteConfig from "./vite.config";
import { tauri } from "vite-plugin-tauri";

// https://vitejs.dev/config/
export default defineConfig(
  mergeConfig(baseViteConfig, {
    plugins: [tauri()],
    clearScreen: false,
    server: {
      open: false,
    },
  }),
);
