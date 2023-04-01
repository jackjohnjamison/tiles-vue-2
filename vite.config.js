import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData(source, fp) {
          // Exclude global imports from including themselves
          if (fp.includes('/scss/global-imports/')) return source

          return `
            @import "@/scss/global-imports/colors.module.scss";
            @import "@/scss/global-imports/spacing.scss";
            @import "@/scss/global-imports/px-to-rem.scss";
            ${source}`
        }
      }
    }
  }
})
