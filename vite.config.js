import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Esto asegura que los recursos están en el root
  build: {
    outDir: 'dist', // Carpeta de salida
    assetsDir: '', // Para que los assets no estén en una subcarpeta
  },
})
