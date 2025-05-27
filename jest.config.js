/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleNameMapper: {
    "^@storybook/addon-actions$":
      "<rootDir>/src/mocks/@storybook/addon-actions.ts",
  },
  preset: "ts-jest/presets/js-with-ts-esm",
  setupFiles: ["<rootDir>/tests/setup.ts"],
  testEnvironment: "jest-environment-jsdom",
};
