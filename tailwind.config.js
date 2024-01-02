/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#151515',
        'black-disabled': '#7d7d7d',
        'white': '#ffffff',
        'white-disabled': '#bababa'
      }
    }
  },
  plugins: [],
}