/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#4f5b66',
        secondary: '#6b7684',
        accent: '#5cb85c',
        surface: '#f8f9fa',
        success: '#5cb85c',
        warning: '#f0ad4e',
        error: '#d9534f',
        info: '#5bc0de',
      },
    },
  },
  plugins: [],
}