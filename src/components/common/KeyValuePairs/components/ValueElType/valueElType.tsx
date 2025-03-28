import { Typography, TypographyProps } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";

/**
 * Basic KeyValuePairs "value" wrapper component.
 */

export const ValueElType = ({
  children,
  component = "div",
  variant = TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_400_2_LINES,
  ...props /* MuiTypographyProps */
}: TypographyProps): JSX.Element => {
  return (
    <Typography component={component} variant={variant} {...props}>
      {children}
    </Typography>
  );
};
