import { CommonColors, PaletteColor } from "@mui/material/styles/createPalette";
import { ThemeProps } from "../../../theme/theme";

// Alert
export const alertLightest = ({
  theme,
}: ThemeProps): PaletteColor["lightest"] => theme.palette.alert.lightest;
export const alertMain = ({ theme }: ThemeProps): PaletteColor["main"] =>
  theme.palette.alert.main;

// Error
export const errorMain = ({ theme }: ThemeProps): PaletteColor["main"] =>
  theme.palette.error.main;

// Info
export const infoDark = ({ theme }: ThemeProps): PaletteColor["dark"] =>
  theme.palette.info.dark;
export const infoLight = ({ theme }: ThemeProps): PaletteColor["light"] =>
  theme.palette.info.light;
export const infoLightest = ({ theme }: ThemeProps): PaletteColor["lightest"] =>
  theme.palette.info.lightest;
export const infoMain = ({ theme }: ThemeProps): PaletteColor["main"] =>
  theme.palette.info.main;

// Ink
export const inkDark = ({ theme }: ThemeProps): PaletteColor["dark"] =>
  theme.palette.ink.dark;
export const inkLight = ({ theme }: ThemeProps): PaletteColor["light"] =>
  theme.palette.ink.light;
export const inkLightest = ({ theme }: ThemeProps): PaletteColor["lightest"] =>
  theme.palette.ink.lightest;
export const inkMain = ({ theme }: ThemeProps): PaletteColor["main"] =>
  theme.palette.ink.main;

// Primary
export const primaryDark = ({ theme }: ThemeProps): PaletteColor["dark"] =>
  theme.palette.primary.dark;
export const primaryMain = ({ theme }: ThemeProps): PaletteColor["main"] =>
  theme.palette.primary.main;

// Smoke
export const smokeDark = ({ theme }: ThemeProps): PaletteColor["dark"] =>
  theme.palette.smoke.dark;
export const smokeLight = ({ theme }: ThemeProps): PaletteColor["light"] =>
  theme.palette.smoke.light;
export const smokeLightest = ({
  theme,
}: ThemeProps): PaletteColor["lightest"] => theme.palette.smoke.lightest;
export const smokeMain = ({ theme }: ThemeProps): PaletteColor["main"] =>
  theme.palette.smoke.main;

// Success
export const successLightest = ({
  theme,
}: ThemeProps): PaletteColor["lightest"] => theme.palette.success.lightest;
export const successMain = ({ theme }: ThemeProps): PaletteColor["main"] =>
  theme.palette.success.main;

// Warning
export const warningLightest = ({
  theme,
}: ThemeProps): PaletteColor["lightest"] => theme.palette.warning.lightest;
export const warningMain = ({ theme }: ThemeProps): PaletteColor["main"] =>
  theme.palette.warning.main;

// White
export const white = ({ theme }: ThemeProps): CommonColors["white"] =>
  theme.palette.common.white;
