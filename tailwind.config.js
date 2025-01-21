/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities, addVariant, addComponents }) {
      addUtilities({
        '.perspective-far': {
          perspective: '1000px',
        },
        '.transform-style-3d': {
          transformStyle: 'preserve-3d',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
          '-webkit-backface-visibility': 'hidden',
        },
        '.transform-flip-y': {
          transform: 'rotateY(180deg)'
        }
      });
      addVariant('all-descendents', '& *');
      addVariant('children', '& > *');
      addComponents({
        '.flipped': {
          '& > div': {
            transform: 'rotateY(180deg)',
          },
        },
      });
    }),
  ],
};
