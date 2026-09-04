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
        frIndex: 'fr/index.html',
        frAbout: 'fr/about.html',
        frContact: 'fr/contact.html',
        frWork: 'fr/work.html',
        frBrenda: 'fr/brenda.html',
        frMercure: 'fr/mercure.html',
        frRougail: 'fr/rougail.html',
        frSonnyvizion: 'fr/sonnyvizion.html',
        frArimont: 'fr/arimont.html',
        frHolora: 'fr/holora.html',
        frElConciergio: 'fr/el-conciergio.html',
        frHormoneConcept: 'fr/hormone-concept.html',
        frKozySneakers: 'fr/kozy-sneakers.html',
        enIndex: 'en/index.html',
        enAbout: 'en/about.html',
        enContact: 'en/contact.html',
        enWork: 'en/work.html',
        enBrenda: 'en/brenda.html',
        enMercure: 'en/mercure.html',
        enRougail: 'en/rougail.html',
        enSonnyvizion: 'en/sonnyvizion.html',
        enArimont: 'en/arimont.html',
        enHolora: 'en/holora.html',
        enElConciergio: 'en/el-conciergio.html',
        enHormoneConcept: 'en/hormone-concept.html',
        enKozySneakers: 'en/kozy-sneakers.html'
      }
    }
  }
})
