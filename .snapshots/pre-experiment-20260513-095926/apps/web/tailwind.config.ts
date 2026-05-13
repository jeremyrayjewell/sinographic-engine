import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans TC"', '"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif TC"', '"Iowan Old Style"', 'serif']
      },
      colors: {
        ink: '#0f172a',
        mist: '#cbd5e1',
        signal: '#67e8f9'
      },
      boxShadow: {
        frame: '0 0 0 1px rgba(148, 163, 184, 0.12), 0 24px 80px rgba(2, 6, 23, 0.35)'
      }
    }
  },
  plugins: []
} satisfies Config
