import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000, // Change as needed
    proxy: {
      '/api': {
        target: 'https://test-env-0xqt.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '') // Adjust if needed
      }
    }
  },
  plugins: [react()]
})
