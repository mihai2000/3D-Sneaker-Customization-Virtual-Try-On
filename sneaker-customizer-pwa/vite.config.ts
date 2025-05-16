import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        // ⬇️ Set the max file size to 5 MB
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules packages by top-level folder
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
    chunkSizeWarningLimit: 1500, // Optional: raise limit from 500 KB to 1.5 MB
  },
});
