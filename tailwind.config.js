/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        madimi: ['Madimi One', 'cursive'],
         mclaren: ['McLaren', 'sans-serif'],
      },
      fontSize: {
        '48px': '48px',
      },
      lineHeight: {
        '100p': '100%',
      },
      letterSpacing: {
        '0p': '0%',
      },
    },
  },
  plugins: [],
}