import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@lib': resolve(__dirname, 'src/headless-date-picker'),
    },
  },
  build: {
    outDir: 'demo-dist',
    emptyOutDir: true,
  },
})