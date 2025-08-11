import {
  createTheme,
  CssVarsTheme,
  Theme,
  ThemeOptions,
  TypographyStyle,
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
      expect("vars" in theme).toBe(true);
    });
  });

  describe("CSS Variables Configuration", () => {
    let vars: CssVarsTheme["vars"];

    beforeEach(() => {
      vars = theme.vars;
      expect(vars).toBeDefined();
    });

    it("should have custom 'app' var exposed as CSS variables", () => {
      const appValue = vars.app?.fontFamily;
      expect(appValue).toBeDefined();
      expect(appValue).toContain(theme.typography.fontFamily);
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
          expect(fontValue).toMatch(new RegExp(`^var\\(--font-${variant}`));

          // Check font size and line height format.
          expect(fontValue).toMatch(/\d+px\/\d+px/);

          // Check ends with font-family.
          expect(fontValue).toMatch(
            new RegExp(`${typographyValue.fontFamily}\\)$`)
          );

          // Full pattern test.
          expect(fontValue).toMatch(
            new RegExp(
              `^var\\(--font-${variant},\\s+\\d+\\s+\\d+px\\/\\d+px\\s+${typographyValue.fontFamily}\\)$`
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
      validateTypographyStyle(theme.typography["body-400"], DEFAULT_BODY_400);
    });

    it("should override body-400 typography styles when custom values provided", () => {
      expect("body-400" in customTheme.typography).toBe(true);
      validateTypographyStyle(
        customTheme.typography["body-400"],
        CUSTOM_BODY_400
      );
    });

    it("should apply custom body-400 styles to CSS variables", () => {
      const fontValue = customTheme.vars?.font?.["body-400"];
      const variant = customTheme.typography["body-400"];
      expect(fontValue).toBeDefined();
      expect(fontValue).toContain(variant.fontSize);
    });

    it("should apply custom fontFamily to CSS variables", () => {
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
