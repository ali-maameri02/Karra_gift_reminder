import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// 🔴 Remove this line:
// import tailwindcss from '@tailwindcss/vite'

import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    // 🔴 Remove: tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true
  }
})