/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/tests/mocks/staticImage.ts",
    "^sb-original/image-context$": "<rootDir>/tests/mocks/imageContext.ts",
  },
  preset: "ts-jest/presets/js-with-ts-esm",
  setupFiles: ["<rootDir>/tests/setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: ["node_modules/(?!(react-idle-timer)/)"],
  // ESM modules (--experimental-vm-modules) aren't released between test files,
  // so a worker's heap only grows; tests/a11y.test.tsx alone loads most of src.
  // Restarting a worker once it passes 1GB keeps CI under its heap limit.
  workerIdleMemoryLimit: "1GB",
};
