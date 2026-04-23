import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  plugins: [react(), dts({ include: "src" }), libInjectCss()],
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
  build: {
    lib: {
      entry: {
        index: "src/index.ts",
      },
      name: "Neo",
      fileName: (format, entryName) => `${entryName}.${format === "es" ? "es" : "cjs"}.js`,
      cssFileName: "neo",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
});

