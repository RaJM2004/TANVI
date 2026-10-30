import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three-vendor';
          }
          if (id.includes('framer-motion') || id.includes('gsap')) {
            return 'motion-vendor';
          }
          if (id.includes('lucide-react') || id.includes('react-router')) {
            return 'ui-vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
