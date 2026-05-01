import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
// ... outros imports

export default defineConfig({
  plugins: [
    // O nome correto da função é TanStackRouterVite e o import deve vir de '/vite'
    TanStackRouterVite(), 
    // ... outros plugins como o @cloudflare/vite-plugin
  ],
  build: {
    // Como você usa TanStack Start, o diretório de saída deve ser 'dist'
    // O framework criará automaticamente as subpastas /client e /server dentro dele
    outDir: 'dist', 
  }
})