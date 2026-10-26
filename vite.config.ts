import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from GitHub Pages at /which-bin/ (its 100 MB file limit fits the 27 MB ONNX runtime).
export default defineConfig({
  base: '/which-bin/',
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1000 },
})
