/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-yellow': '#FFC700',
        'main-dark': '#222222',
      },
      animation: {
        'slide-left': 'slideLeft 0.5s ease-in-out',
        fade: 'fade 0.1s ease-in-out',
      },
      keyframes: {
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fade: {
          '0%': { opacity: '0', display: 'none' },
          '100%': { opacity: '1', display: 'block' },
        },
      },
    },
  },
  plugins: [],
};
