import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "terser",
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/react/") || id.includes("/node_modules/react-dom/")) return "vendor";
          if (id.includes("/node_modules/lightgallery/")) return "gallery";
          if (id.includes("/node_modules/lucide-react/")) return "ui";
        },
      },
    },
  },
});
