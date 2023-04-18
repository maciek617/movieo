/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-yellow': '#FFC700',
        'main-dark': '#222222',
        'custom-green' : 'rgba(100, 200, 100, 0.4)',
        'custom-red' : 'rgba(200, 100, 100, 0.4)'
      },
      minHeight: {
        'min-h-screen': '100vh',
      },
      animation: {
        'slide-left': 'slideLeft 0.5s ease-in-out',
        'slide-right': 'slideRight 0.5s ease-in-out',
        'slide-out': 'slideOut 0.5s ease-in-out',
        fade: 'fade 0.1s ease-in-out',
      },
      keyframes: {
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(30px)' },
        },
        fade: {
          '0%': { opacity: '0', display: 'none' },
          '100%': { opacity: '1', display: 'block' },
        },
      },
      scale: {
        101: '1.01',
      },
      fontSize: {
        xxxs: '6px',
      },
    },
  },
  plugins: [],
};
