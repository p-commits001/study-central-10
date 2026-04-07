import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const isReplit = process.env.REPL_ID !== undefined;
const isProduction = process.env.NODE_ENV === "production";
const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 3000;
const basePath = process.env.BASE_PATH || "/";

export default defineConfig(async () => {
  const plugins: any[] = [react(), tailwindcss()];

  if (isReplit) {
    try {
      const runtimeErrorOverlay = await import(
        "@replit/vite-plugin-runtime-error-modal"
      ).then((m) => m.default);
      plugins.push(runtimeErrorOverlay());
    } catch (_) {}

    if (!isProduction) {
      try {
        const { cartographer } = await import("@replit/vite-plugin-cartographer");
        plugins.push(cartographer({ root: path.resolve(import.meta.dirname, "..") }));
      } catch (_) {}
      try {
        const { devBanner } = await import("@replit/vite-plugin-dev-banner");
        plugins.push(devBanner());
      } catch (_) {}
    }
  }

  return {
    base: basePath,
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
        "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
      },
      dedupe: ["react", "react-dom"],
    },
    root: path.resolve(import.meta.dirname),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
      target: "es2020",
      cssCodeSplit: true,
      cssMinify: "lightningcss",
      minify: "esbuild",
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/") || id.includes("node_modules/scheduler")) return "react-vendor";
            if (id.includes("node_modules/framer-motion")) return "motion";
            if (id.includes("node_modules/@tanstack")) return "query";
            if (id.includes("node_modules/wouter")) return "router";
            if (id.includes("node_modules/lucide-react")) return "icons";
            if (id.includes("node_modules/@radix-ui") || id.includes("node_modules/class-variance-authority") || id.includes("node_modules/clsx") || id.includes("node_modules/tailwind-merge")) return "ui";
            if (id.includes("node_modules/recharts") || id.includes("node_modules/d3-")) return "charts";
            if (id.includes("node_modules/@supabase")) return "supabase";
          },
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
          entryFileNames: "assets/[name]-[hash].js",
          compact: true,
        },
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          unknownGlobalSideEffects: false,
        },
      },
      chunkSizeWarningLimit: 1200,
      reportCompressedSize: false,
      sourcemap: false,
    },
    optimizeDeps: {
      include: ["react", "react-dom", "framer-motion", "wouter", "@tanstack/react-query"],
      esbuildOptions: { target: "es2020" },
      force: false,
    },
    server: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
      fs: { strict: true, deny: ["**/.*"] },
    },
    preview: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
    },
  };
});
