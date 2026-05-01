import { defineConfig } from 'vite'
import path from 'path'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // ESTAVA FALTANDO ESTE IMPORT

export default defineConfig({
  plugins: [
    TanStackRouterVite(), // O Router deve vir antes do React
    react(),
    tailwindcss(), // Tailwind v4 plugin
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})