import { PaletteColorOptions } from "@mui/material";
import { CommonColors, TypeBackground, TypeText } from "@mui/material/styles";

/**
 * Palette "Alert"
 */
const ALERT = {
  LIGHT: "#FED3D1",
  LIGHTEST: "#FFF4F4",
  MAIN: "#B42318",
};

/**
 * Palette "Background"
 */
const BACKGROUND = {
  DEFAULT: "#F6F6F7",
};

/**
 * Palette "Info"
 */
const INFO = {
  CONTRAST_TEXT: "#00729C",
  LIGHT: "#97D6EA",
  LIGHTEST: "#F2FAFC",
  MAIN: "#00729C",
};

/**
 * Palette "Ink"
 */
const INK = {
  LIGHT: "#637381",
  MAIN: "#212B36",
};

/**
 * Palette "Primary"
 */
const PRIMARY = {
  DARK: "#005EA9",
  LIGHTEST: "#E6EFF6",
  MAIN: "#1C7CC7",
};

/**
 * Palette "Smoke"
 */
const SMOKE = {
  DARK: "#C4CDD5",
  LIGHT: "#F6F6F7",
  LIGHTEST: "#FAFBFB",
  MAIN: "#E1E3E5",
};

/**
 * Palette "Success"
 */
const SUCCESS = {
  LIGHT: "#AEE9D1",
  LIGHTEST: "#F1F8F5",
  MAIN: "#287555",
};

/**
 * Palette "Text"
 */
const TEXT = {
  PRIMARY: "#212B36",
};

/**
 * Palette "Warning"
 */
const WARNING = {
  CONTRAST_TEXT: "#B54708",
  LIGHT: "#FFD79D",
  LIGHTEST: "#FFFAEB",
  MAIN: "#B54708",
};

/**
 * Default "Black"
 */
const BLACK = {
  DEFAULT: "#000000",
};

/**
 * Default "White"
 */
const WHITE = {
  DEFAULT: "#ffffff",
};

/**
 * Color alpha
 */
const ALPHA = {
  A04: "0a",
  A08: "14",
  A32: "52",
  A60: "99",
  A64: "a3",
  A80: "cc",
};

/**
 * Color constants
 */
export const alertLight = ALERT.LIGHT;
export const alertLightest = ALERT.LIGHTEST;
export const alertMain = ALERT.MAIN;
export const backgroundDefault = BACKGROUND.DEFAULT;
export const infoContrastText = INFO.CONTRAST_TEXT;
export const infoLight = INFO.LIGHT;
export const infoLightest = INFO.LIGHTEST;
export const infoMain = INFO.MAIN;
export const inkLight = INK.LIGHT;
export const inkMain = INK.MAIN;
export const primaryDark = PRIMARY.DARK;
export const primaryLightest = PRIMARY.LIGHTEST;
export const primaryMain = PRIMARY.MAIN;
export const smokeDark = SMOKE.DARK;
export const smokeLight = SMOKE.LIGHT;
export const smokeLightest = SMOKE.LIGHTEST;
export const smokeMain = SMOKE.MAIN;
export const successLight = SUCCESS.LIGHT;
export const successLightest = SUCCESS.LIGHTEST;
export const successMain = SUCCESS.MAIN;
export const textPrimary = TEXT.PRIMARY;
export const warningContrastText = WARNING.CONTRAST_TEXT;
export const warningLight = WARNING.LIGHT;
export const warningLightest = WARNING.LIGHTEST;
export const warningMain = WARNING.MAIN;
export const black = BLACK.DEFAULT;
export const white = WHITE.DEFAULT;

/**
 * Color alpha constants
 */
export const alpha04 = ALPHA.A04;
export const alpha08 = ALPHA.A08;
export const alpha32 = ALPHA.A32;
export const alpha60 = ALPHA.A60;
export const alpha64 = ALPHA.A64;
export const alpha80 = ALPHA.A80;

/**
 * Shades
 */
export const black04 = `${black}${alpha04}`;
export const black08 = `${black}${alpha08}`;

/**
 * Palette Option "Alert"
 */
export const alert: PaletteColorOptions = {
  light: alertLight,
  lightest: alertLightest,
  main: alertMain,
};

/**
 * Palette Option "Background"
 */
export const background: Pick<TypeBackground, "default"> = {
  default: backgroundDefault,
};

/**
 * Palette Option "Common"
 */
export const common: CommonColors = {
  black: black,
  white: white,
};

/**
 * Palette Option "Info"
 */
export const info: PaletteColorOptions = {
  contrastText: infoContrastText,
  light: infoLight,
  lightest: infoLightest,
  main: infoMain,
};

/**
 * Palette Option "Ink"
 */
export const ink: PaletteColorOptions = {
  light: inkLight,
  main: inkMain,
};

/**
 * Palette Option "Primary"
 */
export const primary: PaletteColorOptions = {
  dark: primaryDark,
  lightest: primaryLightest,
  main: primaryMain,
};

/**
 * Palette Option "Smoke"
 */
export const smoke: PaletteColorOptions = {
  dark: smokeDark,
  light: smokeLight,
  lightest: smokeLightest,
  main: smokeMain,
};

/**
 * Palette Option "Success"
 */
export const success: PaletteColorOptions = {
  light: successLight,
  lightest: successLightest,
  main: successMain,
};

/**
 * Palette Option "Text"
 */
export const text: Pick<TypeText, "primary"> = {
  primary: textPrimary,
};

/**
 * Palette Option "Warning"
 */
export const warning: PaletteColorOptions = {
  contrastText: warningContrastText,
  light: warningLight,
  lightest: warningLightest,
  main: warningMain,
};
