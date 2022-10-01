import { defineConfig } from "vite";
import { tauri } from "vite-plugin-tauri";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
});
