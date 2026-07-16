/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'pure-black': '#000000',
        'off-black': '#0D0D0D',
        charcoal: '#161616',
        'soft-white': '#F8F8F8',
        glass: {
          border: 'rgba(255, 255, 255, 0.06)',
          hover: 'rgba(255, 255, 255, 0.08)',
          active: 'rgba(255, 255, 255, 0.12)',
          bg: 'rgba(255, 255, 255, 0.03)',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        hero: ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.04em' }],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        104: '26rem',
        112: '28rem',
        128: '32rem',
      },
      borderRadius: {
        glass: '1rem',
      },
      backdropBlur: {
        glass: '24px',
      },
      boxShadow: {
        glass:
          '0 0 0 1px rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.4)',
        'glass-lg':
          '0 0 0 1px rgba(255,255,255,0.06), 0 8px 48px rgba(0,0,0,0.5)',
        'glass-xl':
          '0 0 0 1px rgba(255,255,255,0.08), 0 16px 64px rgba(0,0,0,0.6)',
        glow: '0 0 40px rgba(255,255,255,0.06)',
        'glow-lg': '0 0 80px rgba(255,255,255,0.08)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 4s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        shimmer: 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
