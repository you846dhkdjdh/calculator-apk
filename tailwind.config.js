/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ui: ['Tajawal', 'Cairo', 'system-ui', '-apple-system', 'sans-serif'],
        lcd: ['Space Mono', 'JetBrains Mono', 'Courier New', 'monospace'],
        data: ['JetBrains Mono', 'Space Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}