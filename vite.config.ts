import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import webSpatial from "@webspatial/vite-plugin";
import { createHtmlPlugin } from "vite-plugin-html";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: { open: true, host: true },
  plugins: [
    VitePWA({
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon-180x180.png",
        "mask-icon.svg",
      ],
      manifest: {
        name: "Notion",
        short_name: "Notion",
        description:
          "Build Custom Agents, search across all your apps, and automate busywork. The AI workspace where teams get more done, faster.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        display_override: ["standalone"],
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        xr_main_scene: {
          default_size: {
            width: 1920,
            height: 1080,
          },
        },
      } as any,
      devOptions: {
        enabled: true,
      },
      workbox: {
        navigateFallback: "index.html",
      },
    }),
    webSpatial({
      mode: "avp",
      outputDir: "/",
    }),
    createHtmlPlugin({
      inject: {
        data: {
          XR_ENV: process.env.XR_ENV,
        },
      },
    }),
    react(),
    tailwindcss(),
  ],
});
