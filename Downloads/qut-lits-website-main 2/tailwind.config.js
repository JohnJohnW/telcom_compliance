/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: { 
    extend: {
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
        'tomorrow': ['Tomorrow', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        'primary': '#00c2cb',
        'secondary': '#04d150',
        'dark-blue': '#120458',
        'dark-purple': '#230329',
        'purple': '#c521e0',
        'pink': '#e859b8',
        'orange': '#ffa300',
        'emerald': '#50C878',
        'ruby': '#E0115F',
        'sapphire': '#0F52BA',
      }
    } 
  },
  plugins: [],
}
