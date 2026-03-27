import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (id.includes('@dimforge/rapier3d-compat')) return 'rapier-runtime'
          if (id.includes('lightgallery')) return 'gallery'
          if (id.includes('lucide-react')) return 'ui'
          if (id.includes('@react-three') || id.includes('meshline') || id.includes('three') || id.includes('zustand')) return 'three-bundle'
          if (id.includes('react-dom') || id.includes('react')) return 'vendor'
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  }
})
