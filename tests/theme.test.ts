import {
  createTheme,
  CssVarsTheme,
  Theme,
  ThemeOptions,
  TypographyStyle,
  TypographyVariant,
} from "@mui/material";
import { typography as typographyValues } from "../src/theme/common/typography";
import { createAppTheme } from "../src/theme/theme";

type GenericRecord<T = unknown> = Record<string, T>;

const CUSTOM_BODY_400: TypographyStyle = {
  fontSize: "80px",
};

const DEFAULT_BODY_400: TypographyStyle = {
  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "20px",
};

const CUSTOM_OPTIONS: ThemeOptions = {
  typography: {
    // @ts-expect-error - Custom typography variant.
    "body-400": CUSTOM_BODY_400,
    fontFamily: "Roboto",
  },
};

describe("Theme Configuration", () => {
  let baseTheme: Theme;
  let theme: Theme;
  let customTheme: Theme;

  beforeEach(() => {
    baseTheme = createTheme();
    theme = createAppTheme();
    customTheme = createAppTheme(CUSTOM_OPTIONS);
  });

  describe("CSS Variables", () => {
    it("should have css variables enabled", () => {
      expect(isVars(theme)).toBe(true);
    });
  });

  describe("CSS Variables Configuration", () => {
    let vars: CssVarsTheme["vars"];

    beforeEach(() => {
      vars = (theme as Theme & Pick<CssVarsTheme, "vars">).vars;
      expect(vars).toBeDefined();
    });

    it("should have custom 'app' var exposed as CSS variables", () => {
      const variables = vars as unknown as GenericRecord;
      const app = variables.app as unknown as GenericRecord;
      const fontFamily = app.fontFamily;
      expect(fontFamily).toBeDefined();
      expect(fontFamily).toEqual(
        `var(--mui-app-fontFamily, ${theme.typography.fontFamily})`
      );
    });

    it("should have fonts exposed as CSS variables", () => {
      expect(vars.font).toBeDefined();

      Object.keys(typographyValues(baseTheme))
        .filter(filterTypographyVariants)
        .forEach((variant) => {
          // Test the variant exists in both theme and vars.
          expect(variant in theme.typography).toBe(true);
          expect(variant in vars.font).toBe(true);

          const typography = theme.typography as unknown as GenericRecord;
          const font = vars.font as unknown as GenericRecord;

          // Get the font and typography variable value.
          const fontValue = font[variant];
          const typographyValue = typography[variant] as TypographyStyle;

          // Ensure the font family is defined.
          expect(typographyValue.fontFamily).toBeDefined();

          // Check variable pattern.
          expect(fontValue).toMatch(new RegExp(`^var\\(--mui-font-${variant}`));

          // Check font size and line height format.
          expect(fontValue).toMatch(/\d+px\/\d+px/);

          // Check ends with font-family.
          expect(fontValue).toMatch(
            new RegExp(`${typographyValue.fontFamily}\\)$`)
          );

          // Full pattern test.
          expect(fontValue).toMatch(
            new RegExp(
              `^var\\(--mui-font-${variant},\\s+\\d+\\s+\\d+px\\/\\d+px\\s+${typographyValue.fontFamily}\\)$`
            )
          );
        });
    });
  });

  describe("Typography Configuration", () => {
    it("should initialize with default typography settings", () => {
      expect(theme.typography).toBeDefined();
    });

    it("should apply configured typography variants", () => {
      Object.keys(typographyValues(baseTheme))
        .filter(filterTypographyVariants)
        .forEach((variant) => {
          expect(variant in theme.typography).toBe(true);
        });
    });

    it("should apply configured body-400 typography styles", () => {
      expect("body-400" in theme.typography).toBe(true);
      const body400 = theme.typography[
        "body-400" as TypographyVariant
      ] as TypographyStyle;
      validateTypographyStyle(body400, DEFAULT_BODY_400);
    });

    it("should override body-400 typography styles when custom values provided", () => {
      const body400 = customTheme.typography[
        "body-400" as TypographyVariant
      ] as TypographyStyle;
      validateTypographyStyle(body400, CUSTOM_BODY_400);
    });

    it("should apply custom body-400 styles to CSS variables", () => {
      const fontValue =
        customTheme.vars?.font?.["body-400" as TypographyVariant];
      const variant = customTheme.typography["body-400" as TypographyVariant];
      expect(fontValue).toBeDefined();
      expect(fontValue).toContain(variant.fontSize);
    });

    it("should apply custom fontFamily to CSS variables", () => {
      // @ts-expect-error - app var exists on ThemeVars.
      const appValue = customTheme.vars?.app?.fontFamily;
      const fontFamily = customTheme.typography.fontFamily;
      expect(appValue).toBeDefined();
      expect(appValue).toContain(fontFamily);
    });
  });
});

/**
 * Filters typography variant keys to exclude specific predefined variant types.
 * @param value - The typography variant key to be evaluated.
 * @returns Returns true if the variant key is not among the excluded keys; otherwise false.
 */
function filterTypographyVariants(value: string): boolean {
  return !/fontFamily|fontSize|fontWeightLight|fontWeightRegular|fontWeightMedium|fontWeightBold|htmlFontSize|allVariants/.test(
    value
  );
}

/**
 * Type guard to check if a theme is a CssVarsTheme.
 * @param theme - Theme.
 * @returns True if the theme is a CssVarsTheme, false otherwise.
 */
function isVars(theme: Theme): theme is Theme & CssVarsTheme {
  return "vars" in theme;
}

/**
 * Validates that a typography variant (like theme.typography["body-400"])
 * has the expected typography style values.
 * @param actual - Actual typography style to validate.
 * @param expected - Expected typography style values.
 */
export function validateTypographyStyle(
  actual: TypographyStyle,
  expected: TypographyStyle
): void {
  for (const [key, value] of Object.entries(expected)) {
    expect(actual[key]).toEqual(value);
  }
}
