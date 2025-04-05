import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    fs: {
      strict: false
    }
  },
  define: {
    __DEFINES__: JSON.stringify({})
  }
}) 