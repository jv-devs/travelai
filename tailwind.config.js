/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-quicksand)'],
      },
      colors: {
        theme: {
          100: '#f4f4f8',
          300: '#e6e6ea',
          500: '#fed766',
          700: '#2ab7ca',
          750: '#3199da',
          900: '#fe4a49',
        },
      },
      backgroundImage: {
        dreamer: "url('/images/sean-oulashin-KMn4VEeEPR8-unsplash.jpg')",
        builder: "url('/images/heidi-kaden-kYxgm42SQso-unsplash.jpg')",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
