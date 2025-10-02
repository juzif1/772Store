/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,                  // Use global test APIs like `describe`, `it`, etc.
    setupFiles: './src/setupTests.js'
  }
})