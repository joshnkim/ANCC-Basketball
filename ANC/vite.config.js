import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, 'ANC'), // frontend folder
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'dist'), // output folder for deployment
    emptyOutDir: true, // clean before build
  },
})