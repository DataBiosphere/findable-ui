import { Typography, TypographyProps } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "./constants";

export const Optional = ({
  ...props /* MuiTypographyProps */
}: TypographyProps): JSX.Element => {
  return <Typography {...TYPOGRAPHY_PROPS} {...props} />;
};
