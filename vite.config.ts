import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://127.0.0.1:3001",
      "/socket.io": {
        target: "http://127.0.0.1:3002",
        ws: true,
      },
    },
  },

  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@services': path.resolve(__dirname, './src/services'),
      '@models': path.resolve(__dirname, './src/models'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@types': path.resolve(__dirname, './src/types'),
      '@middleware': path.resolve(__dirname, './src/middleware'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'animation': ['gsap', '@nivo/core', "@nivo/pie", "framer-motion"],
          'mantine': ['@mantine/core', '@mantine/hooks', '@mantine/form', '@mantine/modals', '@mantine/notifications'],
        },
      },
    },
  },
});
