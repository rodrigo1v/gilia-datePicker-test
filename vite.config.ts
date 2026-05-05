import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'
  const isDemo = mode === 'demo'

  return {
    plugins: [vue()],

    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },

    test: {
      environment: 'happy-dom',
      globals: true,
    },

    build: isLib
      ? {
          lib: {
            entry: resolve(__dirname, 'src/headless-date-picker/index.ts'),
            name: 'HeadlessDatePicker',
            fileName: 'headless-date-picker',
          },
          rollupOptions: {
            external: []
          }
        }
      : {
          outDir: 'demo-dist'
        }
  }
})
