/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'metro-blue': '#0078D4',
        'metro-green': '#00A86B',
        'metro-orange': '#FF8C00',
        'metro-purple': '#8B5CF6',
        'metro-red': '#E53E3E',
        'metro-teal': '#00B4D8',
      },
      fontFamily: {
        'segoe': ['Segoe UI', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
