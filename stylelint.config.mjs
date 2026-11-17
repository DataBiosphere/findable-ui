/**
 * Keeps the shipped stylesheets in static/ within the supported browsers; see
 * "Supported browsers" in the README. Style rules are left to Prettier.
 * @type {import("stylelint").Config}
 */
const config = {
  plugins: ["stylelint-plugin-use-baseline"],
  rules: {
    "plugin/use-baseline": [true, { available: "widely" }],
  },
};

export default config;
