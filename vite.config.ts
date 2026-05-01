import { defineConfig } from 'vite'
import { tanstackRouter } from '@tanstack/router-plugin'
// ... outros imports

export default defineConfig({
  plugins: [
    tanstackRouter(),
    // ... outros plugins
  ],
  build: {
    outDir: 'dist', // O framework cuidará de criar a subpasta /client
  }
})