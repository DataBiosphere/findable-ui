import { CommonColors, PaletteColor } from "@mui/material/styles";
import { ThemeProps } from "../../../theme/theme";

// Success
export const successLight = ({ theme }: ThemeProps): PaletteColor["light"] =>
  theme.palette.success.light;
export const successLightest = ({
  theme,
}: ThemeProps): PaletteColor["lightest"] => theme.palette.success.lightest;
export const successMain = ({ theme }: ThemeProps): PaletteColor["main"] =>
  theme.palette.success.main;

// Warning
export const warningLight = ({ theme }: ThemeProps): PaletteColor["light"] =>
  theme.palette.warning.light;
export const warningLightest = ({
  theme,
}: ThemeProps): PaletteColor["lightest"] => theme.palette.warning.lightest;
export const warningMain = ({ theme }: ThemeProps): PaletteColor["main"] =>
  theme.palette.warning.main;

// White
export const white = ({ theme }: ThemeProps): CommonColors["white"] =>
  theme.palette.common.white;
