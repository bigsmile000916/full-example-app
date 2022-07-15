/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        sm: '32px',
      },
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};
