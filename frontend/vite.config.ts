import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
  },
  base: '/',
  plugins: [react()] // hot module reload wont work if react plugin not added
})