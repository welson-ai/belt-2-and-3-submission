/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        stellar: {
          black: '#1d1d1f',
          gold: '#b07c3b',
          'gold-light': '#deb15e',
          blue: '#283c62',
          'blue-light': '#3d5180',
          'blue-dark': '#1a2a45',
          background: '#0f1419',
          surface: '#1a1f26',
        },
      },
      animation: {
        'spin': 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
}