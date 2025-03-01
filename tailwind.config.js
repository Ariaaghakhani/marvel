/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray-1': 'rgba(44, 46, 48, 0.7889355571330094)', // Updated with opacity
        'custom-gray-2': 'rgba(14, 14, 14, 1)',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(44, 46, 48, 0.7889355571330094) 0%, rgba(14, 14, 14, 1) 50%)',
      },
    },
  },
  plugins: [],
}