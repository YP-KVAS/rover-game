import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import * as path from 'path'
import EnvironmentPlugin from 'vite-plugin-environment'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 5000,
  },
  plugins: [react(), EnvironmentPlugin('all')],
  resolve: {
    // empty file needed to avoid vite errors caused by sanitize-html
    alias: {
      path: path.resolve(__dirname, './src/assets/empty.ts'),
      fs: path.resolve(__dirname, './src/assets/empty.ts'),
      url: path.resolve(__dirname, './src/assets/empty.ts'),
      'source-map-js': path.resolve(__dirname, './src/assets/empty.ts'),
      $fonts: path.resolve(__dirname, './src/fonts/Play'),
    },
  },
})
