import type { Preview } from "@storybook/react";
import "../../../packages/ui/dist/index.css";

/** @type { import('@storybook/react').Preview } */
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  }
};

export default preview;
