import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4DA3FF',
        'primary-dark': '#2F80ED',
        'primary-light': '#E8F3FF',
        accent: '#2F80ED',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        hero: ['48px', { lineHeight: '1.1', fontWeight: '700' }],
        body: ['18px', { lineHeight: '1.7' }],
      },
      backdropBlur: {
        glass: '12px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      boxShadow: {
        glass: '0 4px 24px rgba(77, 163, 255, 0.08), 0 1px 4px rgba(0,0,0,0.04)',
        'glass-hover': '0 8px 40px rgba(77, 163, 255, 0.15), 0 2px 8px rgba(0,0,0,0.06)',
        'glow-blue': '0 0 20px rgba(77, 163, 255, 0.4)',
      },
    },
  },
  plugins: [],
}

export default config
