import { Preview } from "@storybook/react";

export const parameters: Preview["parameters"] = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    exclude: ["classes", "className", "ref", "sx", "testId"],
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    sort: "alpha",
  },
  layout: "centered",
};
