import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import next from "eslint-config-next";
import jsxA11y from "eslint-plugin-jsx-a11y";
import sonarjs from "eslint-plugin-sonarjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Exported components wrapped in memo(...) or forwardRef(...), named or
// default, including the React.memo / React.forwardRef forms, which the
// function contexts miss.
const WRAPPED_COMPONENT =
  ":matches(ExportNamedDeclaration > VariableDeclaration > VariableDeclarator, ExportDefaultDeclaration) > CallExpression";

// jsx-a11y ships control-has-associated-label off, but with recommended options.
const CONTROL_LABEL_OPTIONS =
  jsxA11y.flatConfigs.recommended.rules[
    "jsx-a11y/control-has-associated-label"
  ][1];

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const config = [
  {
    ignores: ["**/node_modules/**", "**/out/**", "**/.next/**", "lib/**"],
  },
  ...next,
  sonarjs.configs.recommended,
  ...compat.config({
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
      "plugin:prettier/recommended",
      "plugin:storybook/recommended",
      "plugin:@eslint-community/eslint-comments/recommended",
    ],
    parser: "@typescript-eslint/parser",
    plugins: [
      "@typescript-eslint",
      "jsdoc",
      "sort-destructure-keys",
      "perfectionist",
      "react-hooks",
    ],
    rules: {
      "@eslint-community/eslint-comments/require-description": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "jsdoc/check-alignment": "error",
      "jsdoc/check-param-names": "error",
      "jsdoc/require-description": "error",
      "jsdoc/require-hyphen-before-param-description": "error",
      "jsdoc/require-param": "error",
      "jsdoc/require-param-description": "error",
      "jsdoc/require-param-name": "error",
      "jsdoc/require-returns": "error",
      "jsdoc/require-returns-description": "error",
      "perfectionist/sort-enums": "error",
      "perfectionist/sort-interfaces": "error",
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/immutability": "error",
      // react-hooks/incompatible-library is a React-Compiler-aware check
      // that flags library hooks whose return values carry hidden mutable
      // state the Compiler can't safely memoize (e.g. TanStack Table /
      // Virtual). findable-ui does not use the React Compiler, so the rule
      // is not earning its keep today. Revisit alongside any future React
      // Compiler adoption.
      "react-hooks/incompatible-library": "off",
      "react-hooks/refs": "error",
      "react-hooks/set-state-in-effect": "error",
      "react-hooks/static-components": "error",
      // sonarjs v1 dropped `cognitive-complexity` from its recommended preset
      // (the rule's meta lost its `recommended` flag during the v1 rewrite,
      // a discrepancy with the package README). Restore at default threshold
      // 15 to preserve the coverage we had under v0.25.
      "sonarjs/cognitive-complexity": ["error", 15],
      "sort-destructure-keys/sort-destructure-keys": [
        "error",
        { caseSensitive: false },
      ],
      "sort-keys": [
        "error",
        "asc",
        { caseSensitive: true, minKeys: 2, natural: false },
      ],
    },
  }),
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    ignores: ["**/*.styles.ts", "**/*.styles.tsx"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
    },
  },
  // jsx-a11y reasons about the JSX it can see, so a wrapper or styled() alias
  // is invisible to it unless mapped to the element it renders. A local wrapper
  // that labels itself is flagged if its name is mapped, so `Button`, which
  // names many such wrappers and is mostly MUI's Button with text children, is
  // left unmapped. `IconButton` is mapped because it is mostly MUI's own; the
  // odd self-labelling wrapper takes a disable comment. Add any new styled()
  // alias of an icon button here, or it goes unchecked.
  //
  // Even mapped, two cases pass: a spread (<IconButton {...props} />), which
  // may carry a label, and an icon child (<IconButton><CloseRounded />
  // </IconButton>), since the rule can't know MUI hides SvgIcon from assistive
  // tech. tests/a11y.test.tsx runs axe over the rendered stories to cover them.
  // eslint-config-next registers the plugin, so only its rules are taken here.
  {
    files: ["src/**/*.{jsx,tsx}"],
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      "jsx-a11y/control-has-associated-label": [
        "error",
        {
          ...CONTROL_LABEL_OPTIONS,
          // Table cells take the gridcell role, but an empty spacer cell is
          // not a control.
          ignoreElements: [...CONTROL_LABEL_OPTIONS.ignoreElements, "td"],
        },
      ],
    },
    settings: {
      "jsx-a11y": {
        components: {
          ButtonBase: "button",
          DXButton: "button",
          DXIconButton: "button",
          Fab: "button",
          FabLink: "a",
          IconButton: "button",
          MButton: "button",
          MIconButton: "button",
          SocialLink: "a",
          StyledButton: "button",
          StyledButtonBase: "button",
          StyledIconButton: "button",
          UserIcon: "button",
        },
      },
    },
  },
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    ignores: ["**/*.styles.ts", "**/*.styles.tsx", "**/*.test.{ts,tsx}"],
    rules: {
      "jsdoc/require-jsdoc": [
        "error",
        {
          contexts: [
            "TSInterfaceDeclaration",
            `${WRAPPED_COMPONENT}[callee.name=/^(memo|forwardRef)$/]`,
            `${WRAPPED_COMPONENT}[callee.property.name=/^(memo|forwardRef)$/]`,
          ],
          publicOnly: true,
          require: {
            ArrowFunctionExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
          },
        },
      ],
    },
  },
  {
    files: ["**/*.test.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "sonarjs/no-duplicate-string": "off",
    },
  },
];

export default config;
