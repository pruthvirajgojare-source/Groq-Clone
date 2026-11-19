/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        groq: {
          orange: '#F55036',
          'orange-hover': '#E04027',
          'orange-light': '#FF6A50',
          'orange-subtle': '#FFF2F0',
          'orange-glow': 'rgba(245, 80, 54, 0.2)',
          black: '#0A0A0A',
          dark: '#121212',
          surface: '#151515',
          card: '#1A1A1A',
          'card-hover': '#222222',
          border: '#2A2A2A',
          'border-light': '#383838',
          muted: '#8A8A8A',
          lightText: '#EEEEEE',
          green: '#22C55E',
          cyan: '#06B6D4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(245, 80, 54, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(245, 80, 54, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}
