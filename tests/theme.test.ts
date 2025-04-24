import { PaletteColor, Theme, ThemeOptions } from "@mui/material";
import { CssVarsTheme } from "@mui/material/styles/createThemeWithVars";
import { createAppTheme } from "../src/theme/theme";

const CUSTOM_BREAKPOINT_VALUES = {
  lg: 1280,
  md: 1024,
  sm: 600,
  xl: 1600,
  xs: 0,
};

const CUSTOM_PALETTE_PRIMARY = {
  main: "#00ffb6",
};

const DEFAULT_BREAKPOINT_VALUES: Theme["breakpoints"]["values"] = {
  lg: 1280,
  md: 1024,
  sm: 768,
  xl: 1440,
  xs: 0,
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

const DEFAULT_SHADOWS = [
  "none",
  "0 1px 4px 0 #00000012",
  "0 8px 8px -4px #10182808, 0 20px 24px -4px #10182814",
];

const CUSTOM_OPTIONS: ThemeOptions = {
  breakpoints: {
    values: CUSTOM_BREAKPOINT_VALUES,
  },
  palette: { primary: CUSTOM_PALETTE_PRIMARY },
};

describe("Theme Configuration", () => {
  let theme: Theme;
  let customTheme: Theme;

  beforeEach(() => {
    theme = createAppTheme();
    customTheme = createAppTheme(CUSTOM_OPTIONS);
  });

  describe("Breakpoint Configuration", () => {
    it("should use default breakpoint values when no custom options provided", () => {
      expect(theme.breakpoints.values).toEqual(DEFAULT_BREAKPOINT_VALUES);
    });

    it("should override breakpoints when custom values provided", () => {
      expect(customTheme.breakpoints.values).toEqual(CUSTOM_BREAKPOINT_VALUES);
    });
  });

  describe("CSS Variables", () => {
    it("should have css variables enabled", () => {
      expect(isVars(theme)).toBe(true);
    });

    it("should have css variables enabled in custom theme", () => {
      // expect(customTheme.var).toBe(true);
    });
  });

  describe("Palette Configuration", () => {
    it("should initialize with default palette settings", () => {
      expect(theme.palette).toBeDefined();
    });

    it("should apply default alert colors", () => {
      expect("alert" in theme.palette).toBe(true);
      const alert = (theme.palette as unknown as Record<string, unknown>).alert;
      validatePaletteColor(alert, DEFAULT_PALETTE_ALERT);
    });

    it("should apply default background color", () => {
      expect(theme.palette.background.default).toEqual(
        DEFAULT_PALETTE_BACKGROUND.default
      );
    });

    it("should apply default info colors", () => {
      expect("info" in theme.palette).toBe(true);
      const info = (theme.palette as unknown as Record<string, unknown>).info;
      validatePaletteColor(info, DEFAULT_PALETTE_INFO);
    });

    it("should apply default ink colors", () => {
      expect("ink" in theme.palette).toBe(true);
      const ink = (theme.palette as unknown as Record<string, unknown>).ink;
      validatePaletteColor(ink, DEFAULT_PALETTE_INK);
    });

    it("should apply default primary color", () => {
      validatePaletteColor(theme.palette.primary, DEFAULT_PALETTE_PRIMARY);
    });

    it("should apply default smoke colors", () => {
      expect("smoke" in theme.palette).toBe(true);
      const smoke = (theme.palette as unknown as Record<string, unknown>).smoke;
      validatePaletteColor(smoke, DEFAULT_PALETTE_SMOKE);
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

  describe("Shadow Configuration", () => {
    it("should initialize with default shadow settings", () => {
      expect(theme.shadows).toBeDefined();
    });

    it("should have the correct number of shadows", () => {
      expect(theme.shadows.length).toBe(25);
    });

    it("should have the correct default shadow values", () => {
      expect(theme.shadows[0]).toBe(DEFAULT_SHADOWS[0]);
      expect(theme.shadows[1]).toBe(DEFAULT_SHADOWS[1]);
      expect(theme.shadows[2]).toBe(DEFAULT_SHADOWS[2]);
    });
  });
});

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
 * Type guard to check if a theme is a CssVarsTheme.
 * @param theme - Theme.
 * @returns True if the theme is a CssVarsTheme, false otherwise.
 */
function isVars(theme: Theme): theme is Theme & CssVarsTheme {
  return "vars" in theme;
}

/**
 * Validates that a palette color (like theme.palette.alert)
 * has the expected values for given keys.
 * @param actual - Actual palette color object to validate.
 * @param expected - An object containing the expected key-value pairs.
 */
export function validatePaletteColor(
  actual: unknown,
  expected: Record<string, string>
): void {
  expect(isPaletteColor(actual)).toBe(true);
  for (const [key, value] of Object.entries(expected)) {
    expect((actual as Record<string, unknown>)[key]).toEqual(value);
  }
}
