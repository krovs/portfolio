import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://krovs.dev",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
  },
});
