/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        'ch-12': '12ch',
        'ch-20': '20ch',
      },
    },
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
          transform: 'rotateY(180deg)',
        },
        '.transform-flip': {
          transform: 'rotate(180deg)',
        },
        '.grid-cols-auto-fit-250': {
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        },
        '.negative-mt-20': {
          marginTop: '-5rem',
        },
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
