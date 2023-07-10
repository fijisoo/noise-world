const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandblue: colors.blue[500],
        brandred: colors.red[500],
      },
      fontFamily: {
        teko: ["var(--font-teko)"],
        inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
