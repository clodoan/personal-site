/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: "rgb(255 255 255)",
          text: "rgb(51 51 51)",
        },
        dark: {
          background: "rgb(26 26 26)",
          text: "rgb(240 240 240)",
        },
      },
      textColor: {
        "light-text": "rgb(51 51 51)",
        "dark-text": "rgb(240 240 240)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
