const sharedConfig = require("tailwind-config/tailwind.config.js");

module.exports = {
  // prefix ui lib classes to avoid conflicting with the app
  prefix: "ui-",
  content: [
    "./**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [sharedConfig],
};
