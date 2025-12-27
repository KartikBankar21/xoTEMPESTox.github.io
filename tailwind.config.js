/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // This allows you to use 'font-fontello' as a Tailwind class
        fontello: ['fontello', 'sans-serif'],
      },
    },
  },
  plugins: [],
}