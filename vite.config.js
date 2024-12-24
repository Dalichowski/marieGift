import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

import dns from "dns";
dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 8080 },
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", { "naive-ui": ["useNotification"] }],
      eslintrc: { enabled: true },
      dts: false
    }),
    Components({
      dirs: ["components"],
      resolvers: [NaiveUiResolver()],
      dts: false
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  envPrefix: "VUE_"
});
