import { CommonColors, PaletteColor } from "@mui/material/styles";
import { ThemeProps } from "../../../theme/theme";

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
