import { Typography, TypographyProps } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";

/**
 * Basic KeyValuePairs "value" wrapper component.
 */

export const ValueElType = ({
  children,
  variant = TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_400_2LINES,
  ...props /* MuiTypographyProps */
}: TypographyProps): JSX.Element => {
  return (
    <Typography variant={variant} {...props}>
      {children}
    </Typography>
  );
};
