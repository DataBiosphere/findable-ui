import { Typography, TypographyProps } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";

/**
 * Basic KeyValuePairs "key" wrapper component.
 */

export const KeyElType = ({
  children,
  color = TYPOGRAPHY_PROPS.COLOR.INK_LIGHT,
  variant = TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_400_2LINES,
  ...props /* MuiTypographyProps */
}: TypographyProps): JSX.Element => {
  return (
    <Typography color={color} variant={variant} {...props}>
      {children}
    </Typography>
  );
};
