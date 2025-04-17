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
 * Palette Option "Alert"
 */
export const alert: PaletteColorOptions = {
  light: ALERT.LIGHT,
  lightest: ALERT.LIGHTEST,
  main: ALERT.MAIN,
};

/**
 * Palette Option "Background"
 */
export const background: Pick<TypeBackground, "default"> = {
  default: BACKGROUND.DEFAULT,
};

/**
 * Palette Option "Common"
 */
export const common: CommonColors = {
  black: BLACK.DEFAULT,
  white: WHITE.DEFAULT,
};

/**
 * Palette Option "Info"
 */
export const info: PaletteColorOptions = {
  contrastText: INFO.CONTRAST_TEXT,
  light: INFO.LIGHT,
  lightest: INFO.LIGHTEST,
  main: INFO.MAIN,
};

/**
 * Palette Option "Ink"
 */
export const ink: PaletteColorOptions = {
  light: INK.LIGHT,
  main: INK.MAIN,
};

/**
 * Palette Option "Primary"
 */
export const primary: PaletteColorOptions = {
  dark: PRIMARY.DARK,
  lightest: PRIMARY.LIGHTEST,
  main: PRIMARY.MAIN,
};

/**
 * Palette Option "Smoke"
 */
export const smoke: PaletteColorOptions = {
  dark: SMOKE.DARK,
  light: SMOKE.LIGHT,
  lightest: SMOKE.LIGHTEST,
  main: SMOKE.MAIN,
};

/**
 * Palette Option "Success"
 */
export const success: PaletteColorOptions = {
  light: SUCCESS.LIGHT,
  lightest: SUCCESS.LIGHTEST,
  main: SUCCESS.MAIN,
};

/**
 * Palette Option "Text"
 */
export const text: Pick<TypeText, "primary"> = {
  primary: TEXT.PRIMARY,
};

/**
 * Palette Option "Warning"
 */
export const warning: PaletteColorOptions = {
  contrastText: WARNING.CONTRAST_TEXT,
  light: WARNING.LIGHT,
  lightest: WARNING.LIGHTEST,
  main: WARNING.MAIN,
};
