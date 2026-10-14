import { TypographyProps } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "./constants";
import { StyledTypography } from "./label.styles";

/**
 * Step label text.
 * @param props - MUI typography props.
 * @returns The step label text.
 */
export const Label = ({
  ...props /* MuiTypographyProps */
}: TypographyProps): JSX.Element => {
  return <StyledTypography {...TYPOGRAPHY_PROPS} {...props} />;
};
