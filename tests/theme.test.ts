import {
  createTheme,
  CssVarsTheme,
  Palette,
  PaletteColor,
  Theme,
  ThemeOptions,
  ThemeVars,
  TypographyStyle,
} from "@mui/material";
import { components as componentsValues } from "../src/theme/common/components";
import { palette as paletteValues } from "../src/theme/common/palette";
import { typography as typographyValues } from "../src/theme/common/typography";
import { createAppTheme } from "../src/theme/theme";

type GenericRecord<T = unknown> = Record<string, T>;

const CUSTOM_BODY_400: TypographyStyle = {
  fontSize: "80px",
};

const CUSTOM_BREAKPOINTS = {
  values: {
    lg: 1280,
    md: 1024,
    sm: 600,
    xl: 1600,
    xs: 0,
  },
};

const CUSTOM_PALETTE_PRIMARY = {
  main: "#00ffb6",
};

const DEFAULT_BODY_400: TypographyStyle = {
  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "20px",
};

const DEFAULT_BREAKPOINTS = {
  values: {
    lg: 1440,
    md: 1280,
    sm: 768,
    xs: 0,
  },
};

const DEFAULT_PALETTE_ALERT = {
  light: "#FED3D1",
  lightest: "#FFF4F4",
  main: "#B42318",
};

const DEFAULT_PALETTE_BACKGROUND = {
  default: "#F6F6F7",
};

const DEFAULT_PALETTE_INFO = {
  contrastText: "#00729C",
  light: "#97D6EA",
  lightest: "#F2FAFC",
  main: "#00729C",
};

const DEFAULT_PALETTE_INK = {
  light: "#637381",
  main: "#212B36",
};

const DEFAULT_PALETTE_PRIMARY = {
  dark: "#005EA9",
  lightest: "#E6EFF6",
  main: "#1C7CC7",
};

const DEFAULT_PALETTE_SMOKE = {
  dark: "#C4CDD5",
  light: "#F6F6F7",
  lightest: "#FAFBFB",
  main: "#E1E3E5",
};

const DEFAULT_PALETTE_SUCCESS = {
  light: "#AEE9D1",
  lightest: "#F1F8F5",
  main: "#287555",
};

const DEFAULT_PALETTE_TEXT = {
  primary: "#212B36",
};

const DEFAULT_PALETTE_WARNING = {
  contrastText: "#B54708",
  light: "#FFD79D",
  lightest: "#FFFAEB",
  main: "#B54708",
};

const CUSTOM_OPTIONS: ThemeOptions = {
  breakpoints: CUSTOM_BREAKPOINTS,
  palette: { primary: CUSTOM_PALETTE_PRIMARY },
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

    it("should have palette colors exposed as CSS variables", () => {
      expect(vars.palette).toBeDefined();

      Object.keys(paletteValues).forEach((color) => {
        // Test the color exists in both theme and vars.
        expect(color in theme.palette).toBe(true);
        expect(color in vars.palette).toBe(true);

        const palette = theme.palette;
        const paletteColor = palette[color as keyof Palette];
        const varsPalette = vars.palette;
        const varsColor = varsPalette[color as keyof ThemeVars["palette"]];

        // We only expect the return varsColor to be an object.
        expect(varsColor).toBeInstanceOf(Object);

        Object.entries(paletteColor).forEach(([shade, value]) => {
          // Test the shade exists in the vars.
          expect(shade in (varsColor as object)).toBe(true);

          // Full pattern test.
          expect((vars.palette as any)[color][shade]).toEqual(
            `var(--palette-${color}-${shade}, ${value})`
          );
        });
      });
    });
  });

  describe("Breakpoint Configuration", () => {
    it("should use default breakpoint values when no custom options provided", () => {
      expect(theme.breakpoints.values).toEqual(DEFAULT_BREAKPOINTS.values);
    });

    it("should override breakpoints when custom values provided", () => {
      expect(customTheme.breakpoints.values).toEqual(CUSTOM_BREAKPOINTS.values);
    });
  });

  describe("Components Configuration", () => {
    it("should initialize with default components settings", () => {
      expect(theme.components).toBeDefined();
    });

    it("should apply configured components variants", () => {
      expect(componentsValues).toBeDefined();
      Object.keys(componentsValues!).forEach((component) => {
        expect(component in theme.components!).toBe(true);
      });
    });

    it("should override MuiToolbar component breakpoints when custom values provided", () => {
      // Get the component styleOverrides.
      const styleOverrides = customTheme.components?.MuiToolbar?.styleOverrides;
      expect(styleOverrides).toBeDefined();

      // The root property should be a function that receives theme.
      const rootFunction = styleOverrides?.root;
      expect(typeof rootFunction).toBe("function");

      if (typeof rootFunction === "function") {
        // Call the function with the custom theme to get the computed styles.
        const computedStyles = rootFunction({
          ownerState: {},
          theme: customTheme,
        });

        // Verify that the computed styles contain the custom breakpoint values.
        // The breakpoint functions should generate media queries using custom values.
        expect(computedStyles).toBeDefined();

        const styleKeys = Object.keys(computedStyles!);

        // Confirm that breakpoint-based custom styles are present.
        expect(
          hasBreakpointKey(styleKeys, CUSTOM_BREAKPOINTS.values.xs)
        ).toBeTruthy();
        expect(
          hasBreakpointKey(styleKeys, CUSTOM_BREAKPOINTS.values.lg)
        ).toBeTruthy();
      }
    });
  });

  describe("Palette Configuration", () => {
    it("should initialize with default palette settings", () => {
      expect(theme.palette).toBeDefined();
    });

    it("should apply default alert colors", () => {
      expect("alert" in theme.palette).toBe(true);
      validatePaletteColor(theme.palette.alert, DEFAULT_PALETTE_ALERT);
    });

    it("should apply default background color", () => {
      expect(theme.palette.background.default).toEqual(
        DEFAULT_PALETTE_BACKGROUND.default
      );
    });

    it("should apply default info colors", () => {
      expect("info" in theme.palette).toBe(true);
      validatePaletteColor(theme.palette.info, DEFAULT_PALETTE_INFO);
    });

    it("should apply default ink colors", () => {
      expect("ink" in theme.palette).toBe(true);
      validatePaletteColor(theme.palette.ink, DEFAULT_PALETTE_INK);
    });

    it("should apply default primary color", () => {
      validatePaletteColor(theme.palette.primary, DEFAULT_PALETTE_PRIMARY);
    });

    it("should apply default smoke colors", () => {
      expect("smoke" in theme.palette).toBe(true);
      validatePaletteColor(theme.palette.smoke, DEFAULT_PALETTE_SMOKE);
    });

    it("should apply default success color", () => {
      validatePaletteColor(theme.palette.success, DEFAULT_PALETTE_SUCCESS);
    });

    it("should apply default text color", () => {
      expect(theme.palette.text.primary).toEqual(DEFAULT_PALETTE_TEXT.primary);
    });

    it("should apply default warning colors", () => {
      validatePaletteColor(theme.palette.warning, DEFAULT_PALETTE_WARNING);
    });

    it("should apply custom primary color when specified", () => {
      expect(customTheme.palette.primary.main).toEqual(
        CUSTOM_PALETTE_PRIMARY.main
      );
      // Validate that primary dark and lightest are not overridden.
      validatePaletteColor(customTheme.palette.primary, {
        dark: DEFAULT_PALETTE_PRIMARY.dark,
        lightest: DEFAULT_PALETTE_PRIMARY.lightest,
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
 * Checks if a style key exists for a given breakpoint.
 * @param keys - Style keys.
 * @param breakpoint - Breakpoint.
 * @returns True if the style key exists for the given breakpoint, false otherwise.
 */
function hasBreakpointKey(keys: string[], breakpoint: number): boolean {
  return keys.some(
    (key) => /^@media/.test(key) && key.includes(String(breakpoint))
  );
}

/**
 * Type guard to check if a value is a PaletteColor.
 * @param color - Color.
 * @returns True if the color is a valid PaletteColor, false otherwise.
 */
function isPaletteColor(color: unknown): color is PaletteColor {
  return (
    color !== null &&
    typeof color === "object" &&
    "light" in color &&
    "main" in color
  );
}

/**
 * Validates that a palette color (like theme.palette.alert)
 * has the expected values for given keys.
 * @param actual - Actual palette color object to validate.
 * @param expected - An object containing the expected key-value pairs.
 */
function validatePaletteColor(
  actual: unknown,
  expected: Record<string, string>
): void {
  expect(isPaletteColor(actual)).toBe(true);
  for (const [key, value] of Object.entries(expected)) {
    expect((actual as Record<string, unknown>)[key]).toEqual(value);
  }
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
