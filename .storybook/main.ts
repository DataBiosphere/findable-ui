import { defineMain } from "@storybook/nextjs-vite/node";

export default defineMain({
  addons: ["@storybook/addon-a11y"],
  core: {
    builder: "@storybook/builder-vite",
    disableTelemetry: true,
  },
  framework: "@storybook/nextjs-vite",
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
});
