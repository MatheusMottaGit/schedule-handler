/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter']
      },

      backgroundImage: {
        'dot-pattern': 'radial-gradient(currentColor 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-pattern-size': '10px 10px', // Ajuste o tamanho do padrão de dots conforme necessário
      },
    },
  },
  plugins: [],
}