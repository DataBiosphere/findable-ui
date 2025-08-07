import { CommonColors } from "@mui/material/styles";
import { ThemeProps } from "../../../theme/theme";

// White
export const white = ({ theme }: ThemeProps): CommonColors["white"] =>
  theme.palette.common.white;
