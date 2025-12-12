/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest/presets/js-with-ts-esm",
  setupFiles: ["<rootDir>/tests/setup.ts"],
  testEnvironment: "jest-environment-jsdom",
};
