const colors = require("tailwindcss/colors");

module.exports = {
  theme: {
    fontSize: {
      xxs: "0.625rem",
      xs: "0.75rem",
      base: "0.875rem",
      xl: "1.125rem",
      xxl: "1.5rem",
      h1: "2rem",
    },
    extend: {
      fontSize: {
        xxs: "0.625rem",
        xs: "0.75rem",
        base: "0.875rem",
        xl: "1.125rem",
        xxl: "1.5rem",
        h1: "2rem",
      },
      colors: {
        brandWhite: "#F3F3F3",
        brandDark: "#2F4858",
        brandDarkHover: "#1f3442",
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
