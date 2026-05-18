import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black:    { DEFAULT: '#0A0A0A', soft: '#111113' },
        card:     { dark: '#1A1A1C', mid: '#222226' },
        red:      { DEFAULT: '#C0392B', bright: '#E03222', dark: '#8B1A14' },
        gold:     { DEFAULT: '#C9A227', light: '#E8BE45', dim: '#8A6E1A' },
        offwhite: { DEFAULT: '#F5F5F0', dim: '#C8C8C2', muted: '#7A7A74' },
      },
      fontFamily: {
        display: ['Teko', 'sans-serif'],
        heading: ['Bebas Neue', 'cursive'],
        body:    ['DM Sans', 'Noto Sans Tamil', 'sans-serif'],
        tamil:   ['Noto Sans Tamil', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(64px, 12vw, 140px)', { lineHeight: '0.9', letterSpacing: '0.01em' }],
        'display-lg': ['clamp(48px, 8vw, 100px)',  { lineHeight: '0.92', letterSpacing: '0.01em' }],
        'display-md': ['clamp(36px, 6vw, 72px)',   { lineHeight: '1', letterSpacing: '0.02em' }],
      },
      spacing: {
        'nav': '64px',
        'bottom-nav': '64px',
        '18': '72px',
      },
      backgroundImage: {
        'hero-gradient':   'linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,1) 100%)',
        'card-gradient':   'linear-gradient(135deg, #1A1A1C 0%, #111113 100%)',
        'gold-gradient':   'linear-gradient(135deg, #E8BE45 0%, #C9A227 50%, #8A6E1A 100%)',
        'red-gradient':    'linear-gradient(135deg, #E03222 0%, #C0392B 100%)',
        'stripe':          'repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(192,57,43,0.03) 10px, rgba(192,57,43,0.03) 20px)',
      },
      animation: {
        'ticker':      'ticker 30s linear infinite',
        'shimmer':     'shimmer 1.5s ease-in-out infinite',
        'pulse-ring':  'pulse-ring 1.5s ease-out infinite',
        'slide-up':    'slideUp 0.7s ease forwards',
        'fade-in':     'fadeIn 0.5s ease forwards',
        'scale-in':    'scaleIn 0.4s ease forwards',
        'float':       'float 3s ease-in-out infinite',
      },
      keyframes: {
        ticker:      { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        shimmer:     { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'pulse-ring': { '0%': { transform: 'scale(1)', opacity: '0.6' }, '100%': { transform: 'scale(1.4)', opacity: '0' } },
        slideUp:     { from: { opacity: '0', transform: 'translateY(32px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:      { from: { opacity: '0' }, to: { opacity: '1' } },
        scaleIn:     { from: { opacity: '0', transform: 'scale(0.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
        float:       { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
      boxShadow: {
        'red':      '0 8px 24px rgba(192,57,43,0.4)',
        'gold':     '0 8px 24px rgba(201,162,39,0.4)',
        'card':     '0 4px 20px rgba(0,0,0,0.4)',
        'card-xl':  '0 16px 60px rgba(0,0,0,0.6)',
        'glow-red': '0 0 20px rgba(192,57,43,0.35), 0 0 60px rgba(192,57,43,0.15)',
        'glow-gold':'0 0 20px rgba(201,162,39,0.4),  0 0 60px rgba(201,162,39,0.15)',
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
    },
  },
  plugins: [],
}
export default config
