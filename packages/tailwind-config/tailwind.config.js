const colors = require("tailwindcss/colors");

module.exports = {
  theme: {
    extend: {
      colors: {
        brandblue: colors.blue[500],
        brandred: colors.red[500],
        ...colors,
      },
      fontFamily: {
        teko: ["var(--font-teko)"],
        inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
