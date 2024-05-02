import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';


export default defineConfig({
  plugins: [
    react(), 
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg', 'cartIcon.png'],
      manifest: {
        name: 'Good One Deals',
        short_name: 'Good One Deals',
        theme_color: '#ffffff',
        icons: [
            {
                src: 'cartIcon.png',
                sizes: '92*92',
                type: 'image/png'
            },
        ],
      }, 
    })
  ],
})