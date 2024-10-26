import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Change this to the desired port
  },
  css: {
    postcss: "./postcss.config.cjs", // Point to the new file
  },
});
