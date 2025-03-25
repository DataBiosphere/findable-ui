import { Preview } from "@storybook/react";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";

export const parameters: Preview["parameters"] = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    exclude: ["className", "ref", "sx"],
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "centered",
  nextRouter: {
    Provider: RouterContext.Provider,
    basePath: "",
  },
};
