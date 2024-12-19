// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: "ClassMatch-Crud/tree/Deployment",
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    strictPort: true,
    port: 5173,
    }
})
