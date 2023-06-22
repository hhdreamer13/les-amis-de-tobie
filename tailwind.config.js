/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "image-back": "url('/leaf/bg-1080.webp')",
      },
      fontFamily: {
        mottona: ["mottona", "cursive"],
        caveat: ["caveat", "cursive"],
      },
    },
  },
  plugins: [],
};
