module.exports = {
  ...require('@tvrestaurant/tailwind-config/tailwind.config'),
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      fontFamily: {
        fira: ['var(--font-fira-mono)'],
      },
    },
  },
  darkMode: 'class',
};
