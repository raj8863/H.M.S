/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',  // Adjust the paths based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Blue color
        'primary/90': '#1d4ed8', // Slightly darker blue for hover states
        'primary/80': '#1e40af', // Even darker blue
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill,minmax(200px,1fr))'
      }
    },
  },
  plugins: [],
};
