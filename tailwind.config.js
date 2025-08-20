/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b0f",
        card: "#121218",
        ink: "#e7e7ee",
        accent: "#7c5cff"
      }
    }
  },
  plugins: []
}
