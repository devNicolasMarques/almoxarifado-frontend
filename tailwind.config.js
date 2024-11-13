/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-senai': '#005CAA',
        'blue-actions': '#3B71CA',
        'back-gray' : '#F5F6FB',
        'gray-text': '#71717A',
        'gray-link': '#9CA3AF',
        'blue-link': '#005CAA'
      },
      spacing: {
        'nav': '7vh',
        'content': '93vh',
        'sidebar': '15vw',
        'management': '85vw',
        'table': '70vh'
      }
    },
  },
  plugins: [],
}