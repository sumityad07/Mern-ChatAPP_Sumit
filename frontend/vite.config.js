import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace this with your actual ngrok URL (without https://)
const ngrokHost = '0302-2405-201-4032-7137-d11c-8d87-c2be-a32a.ngrok-free.app'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow external access
    port: 5174,
    allowedHosts: [ngrokHost] // ✅ Add your ngrok host here
  }
})
