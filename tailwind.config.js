/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3E236E',
          foreground: '#FFFFFF',
        },
        background: '#FFFFFF',
        // Optional: add accent colors
        accent: {
          red: '#FF6B6B',
          purple: '#3E236E',
        }
      },
    },
  },
  plugins: [],
}