import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";

export interface CardTextProps {
  children: ReactNode;
}

export const CardText = ({
  children,
  ...props /* Spread props to allow for Mui TypographyProps specific prop overrides e.g. "variant". */
}: CardTextProps): JSX.Element => {
  return (
    <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400_2_LINES} {...props}>
      {children}
    </Typography>
  );
};
