import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  // StreetSmart is only imported inside map-core's lazy Cyclomedia chunk, so
  // the dev server doesn't discover it in the initial scan; prebundling it
  // upfront avoids a mid-session re-optimize (504 Outdated Optimize Dep).
  optimizeDeps: {
    include: ["@cyclomedia/streetsmart-api"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5173,
  },
});
