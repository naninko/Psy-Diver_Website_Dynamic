import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist'
  },
  server: {
    host: true,
    port: 5173,
    https: {
      key: readFileSync('./localhost-key.pem'),
      cert: readFileSync('./localhost.pem')
    },
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
})
