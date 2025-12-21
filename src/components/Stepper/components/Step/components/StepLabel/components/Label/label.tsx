import { TypographyProps } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "./constants";
import { StyledTypography } from "./label.styles";

export const Label = ({
  ...props /* MuiTypographyProps */
}: TypographyProps): JSX.Element => {
  return <StyledTypography {...TYPOGRAPHY_PROPS} {...props} />;
};
