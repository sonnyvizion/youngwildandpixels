import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.VITE_BASE || '/',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        contact: 'contact.html',
        work: 'work.html'
      }
    }
  }
})
