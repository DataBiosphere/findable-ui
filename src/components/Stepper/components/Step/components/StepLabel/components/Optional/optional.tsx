import { Typography, TypographyProps } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "./constants";

/**
 * Optional text shown under a step label.
 * @param props - MUI typography props.
 * @returns The optional text.
 */
export const Optional = ({
  ...props /* MuiTypographyProps */
}: TypographyProps): JSX.Element => {
  return <Typography {...TYPOGRAPHY_PROPS} {...props} />;
};
