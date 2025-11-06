import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    open: true, // optional: auto open browser
    hmr: true   // ensures hot module reloading is on
  },
  base: mode === 'production' ? '/financial-career-framework/' : '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
);