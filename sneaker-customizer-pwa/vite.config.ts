import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg', 'robots.txt'],
      manifest: {
        name: '3D Sneaker Customizer',
        short_name: 'Sneaker3D',
        description: 'Customize your 3D sneakers with full creativity.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'react.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'react.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'react.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
