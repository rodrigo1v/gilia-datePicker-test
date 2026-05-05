import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/headless-date-picker/index.ts'),
      name: 'HeadlessDatePicker',
      fileName: 'headless-date-picker',
    },
    rollupOptions: {
      external: ['vue'],
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
  },
})
