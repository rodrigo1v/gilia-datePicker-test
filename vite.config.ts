import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/headless-date-picker/index.ts'),
      name: 'HeadlessDatePicker',
      fileName: 'headless-date-picker',
    },
    rollupOptions: {
      external: []
    }
  }
})