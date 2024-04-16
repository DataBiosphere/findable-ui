import * as path from "path";

const toPath = (filePath: string) => path.join(process.cwd(), filePath);

export default {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm",
  ],
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      // Filter out third-party props from node_modules except @mui packages
      propFilter: (prop: any) =>
        prop.parent
          ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName)
          : true,
    },
  },
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  webpackFinal: async (config: any) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          app: path.resolve(__dirname, "../src"),
          //images: path.resolve(__dirname, "../images"),
          "@emotion/core": toPath("node_modules/@emotion/react"),
          "emotion-theming": toPath("node_modules/@emotion/react"),
        },
      },
    };
  },
  docs: {
    autodocs: true,
  },
};
