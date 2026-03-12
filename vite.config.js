import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/india-market-terminal/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html'
    }
  }
})
