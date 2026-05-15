import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@sinographic-engine/shared-types': path.resolve(
        __dirname,
        '../../packages/shared-types/src/index.ts'
      ),
      '@sinographic-engine/learning-engine': path.resolve(
        __dirname,
        '../../packages/learning-engine/src/index.ts'
      ),
      '@sinographic-engine/number-engine': path.resolve(
        __dirname,
        '../../packages/number-engine/src/index.ts'
      ),
      '@sinographic-engine/classifier-content': path.resolve(
        __dirname,
        '../../packages/classifier-content/src/index.ts'
      ),
      '@sinographic-engine/speech-engine': path.resolve(
        __dirname,
        '../../packages/speech-engine/src/index.ts'
      ),
      '@sinographic-engine/ui': path.resolve(
        __dirname,
        '../../packages/ui/src/index.ts'
      )
    }
  }
})
