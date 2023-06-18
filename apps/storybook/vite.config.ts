import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@packages', replacement: fileURLToPath(new URL('./../../packages', import.meta.url)) },
      { find: '@ui', replacement: fileURLToPath(new URL('./../../packages/ui', import.meta.url)) },
    ],
  },
})
