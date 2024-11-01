import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['tip-calculator.svg', 'tip-calculator-192.png'],
      manifest: {
        name: 'Smart Tip Calculator',
        short_name: 'TipCalc',
        description: 'Calculate tips and taxes based on your location',
        theme_color: '#1e293b',
        background_color: '#1e293b',
        display: 'standalone',
        icons: [
          {
            src: 'tip-calculator-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'tip-calculator-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});