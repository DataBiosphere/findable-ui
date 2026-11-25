/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS config file */
const fs = require("fs");
const path = require("path");
const ts = require("typescript");
/* eslint-enable @typescript-eslint/no-require-imports -- CommonJS config file */

/* eslint-disable @typescript-eslint/explicit-function-return-type -- JavaScript file; the JSDoc gives the types */

/**
 * Whether a TypeScript file compiles to no JavaScript (only types, interfaces
 * or type re-exports).
 * @param file - Path relative to the repo root.
 * @returns True when the compiled output holds no code.
 */
function emitsNoJavaScript(file) {
  const { outputText } = ts.transpileModule(
    fs.readFileSync(path.join(__dirname, file), "utf8"),
    {
      compilerOptions: {
        jsx: ts.JsxEmit.ReactJSX,
        module: ts.ModuleKind.ESNext,
        removeComments: true,
      },
      fileName: file,
    },
  );
  // A types-only module compiles to `export {};`, after any "use client".
  const code = outputText.replace(/^["']use client["'];/, "").trim();
  return code === "" || code === "export {};";
}

/**
 * Coverage ignore patterns for the TypeScript files in src/ that compile to no
 * JavaScript. Jest substitutes `<rootDir>` unescaped, so each pattern is the
 * escaped absolute path instead.
 * @returns One exact-path pattern per such file.
 */
function typesOnlyFilePatterns() {
  return fs
    .readdirSync(path.join(__dirname, "src"), { recursive: true })
    .map((file) => path.join("src", file))
    .filter((file) => /\.tsx?$/.test(file) && emitsNoJavaScript(file))
    .map(
      (file) =>
        `^${path.join(__dirname, file).replace(/[$()*+.?[\\\]^{|}]/g, "\\$&")}$`,
    );
}

/* eslint-enable @typescript-eslint/explicit-function-return-type -- JavaScript file; the JSDoc gives the types */

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Production code. `src/*/**` takes only src/'s folders: its one root file,
  // index.ts, is a type re-export.
  collectCoverageFrom: [
    "src/*/**/*.{ts,tsx}",
    "static/analytics.js",
    "!src/**/*.figma.ts",
    "!src/**/*.stories.{ts,tsx}",
    "!src/**/stories/**",
    "!src/mocks/**",
    "!src/storybook/**",
    "!src/tests/utils.ts",
    "!src/utils/tests.ts",
  ],
  // Jest manual mocks, and files that compile to no JavaScript: v8 coverage
  // reports an untested types-only file as uncovered lines (jestjs/jest#14422).
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/__mocks__/",
    // Style declarations, excluded by name whatever logic their callbacks hold.
    "\\.styles\\.tsx?$",
    // Settings, excluded by name; some also define table features or helpers.
    "/constants\\.ts$",
    ...typesOnlyFilePatterns(),
  ],
  coverageProvider: "v8",
  // The table goes to the log; maxCols keeps file names from being cut short.
  // The totals file feeds the CI step summary, the XML feeds diff-cover.
  coverageReporters: [
    ["text", { maxCols: 120 }],
    ["text-summary", { file: "coverage-summary.txt" }],
    "cobertura",
  ],
  // Each floor is the measured coverage, rounded down, minus 1.
  coverageThreshold: {
    global: {
      branches: 78,
      lines: 69,
    },
  },
  moduleNameMapper: {
    "\\.css$": "<rootDir>/tests/mocks/style.ts",
    "\\.svg$": "<rootDir>/tests/mocks/staticImage.ts",
    "^sb-original/image-context$": "<rootDir>/tests/mocks/imageContext.ts",
  },
  preset: "ts-jest/presets/js-with-ts-esm",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: ["node_modules/(?!(react-idle-timer)/)"],
  // ESM modules (--experimental-vm-modules) aren't released between test files,
  // so a worker's heap only grows; tests/a11y.test.tsx alone loads most of src.
  // Restarting a worker once it passes 1GB keeps CI under its heap limit.
  workerIdleMemoryLimit: "1GB",
};
