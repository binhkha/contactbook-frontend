import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'  // ← THÊM DÒNG NÀY

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // ← THÊM ĐOẠN NÀY
    },
  },
})