import {
  CommonColors,
  PaletteColorOptions,
  PaletteOptions,
  TypeBackground,
  TypeText,
} from "@mui/material";

const ALERT = {
  LIGHT: "#FED3D1",
  LIGHTEST: "#FFF4F4",
  MAIN: "#B42318",
};

const BACKGROUND = {
  DEFAULT: "#F6F6F7",
};

const INFO = {
  CONTRAST_TEXT: "#00729C",
  LIGHT: "#97D6EA",
  LIGHTEST: "#F2FAFC",
  MAIN: "#00729C",
};

const INK = {
  LIGHT: "#637381",
  MAIN: "#212B36",
};

const PRIMARY = {
  DARK: "#005EA9",
  LIGHTEST: "#E6EFF6",
  MAIN: "#1C7CC7",
};

const PURPLE = {
  MAIN: "#622395",
};

const SMOKE = {
  DARK: "#C4CDD5",
  LIGHT: "#F6F6F7",
  LIGHTEST: "#FAFBFB",
  MAIN: "#E1E3E5",
};

const SUCCESS = {
  LIGHT: "#AEE9D1",
  LIGHTEST: "#F1F8F5",
  MAIN: "#287555",
};

const TEXT = {
  PRIMARY: "#212B36",
};

const WARNING = {
  CONTRAST_TEXT: "#B54708",
  LIGHT: "#FFD79D",
  LIGHTEST: "#FFFAEB",
  MAIN: "#B54708",
};

const BLACK = {
  DEFAULT: "#000000",
};

const WHITE = {
  DEFAULT: "#ffffff",
};

const alert: PaletteColorOptions = {
  light: ALERT.LIGHT,
  lightest: ALERT.LIGHTEST,
  main: ALERT.MAIN,
};

const background: Pick<TypeBackground, "default"> = {
  default: BACKGROUND.DEFAULT,
};

const common: CommonColors = {
  black: BLACK.DEFAULT,
  white: WHITE.DEFAULT,
};

const info: PaletteColorOptions = {
  contrastText: INFO.CONTRAST_TEXT,
  light: INFO.LIGHT,
  lightest: INFO.LIGHTEST,
  main: INFO.MAIN,
};

const ink: PaletteColorOptions = {
  light: INK.LIGHT,
  main: INK.MAIN,
};

const primary: PaletteColorOptions = {
  dark: PRIMARY.DARK,
  lightest: PRIMARY.LIGHTEST,
  main: PRIMARY.MAIN,
};

const purple: PaletteColorOptions = {
  main: PURPLE.MAIN,
};

const smoke: PaletteColorOptions = {
  dark: SMOKE.DARK,
  light: SMOKE.LIGHT,
  lightest: SMOKE.LIGHTEST,
  main: SMOKE.MAIN,
};

const success: PaletteColorOptions = {
  light: SUCCESS.LIGHT,
  lightest: SUCCESS.LIGHTEST,
  main: SUCCESS.MAIN,
};

const text: Pick<TypeText, "primary"> = {
  primary: TEXT.PRIMARY,
};

const warning: PaletteColorOptions = {
  contrastText: WARNING.CONTRAST_TEXT,
  light: WARNING.LIGHT,
  lightest: WARNING.LIGHTEST,
  main: WARNING.MAIN,
};

export const palette: PaletteOptions = {
  alert,
  background,
  common,
  info,
  ink,
  primary,
  purple,
  smoke,
  success,
  text,
  warning,
};
