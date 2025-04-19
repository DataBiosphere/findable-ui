import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";

export interface CardSecondaryTextProps {
  children: ReactNode;
}

export const CardSecondaryText = ({
  children,
  ...props /* Spread props to allow for Mui TypographyProps specific prop overrides e.g. "variant". */
}: CardSecondaryTextProps): JSX.Element => {
  return (
    <Typography
      color="ink.light"
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400_2_LINES}
      {...props}
    >
      {children}
    </Typography>
  );
};
