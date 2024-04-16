import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { TEXT_BODY_400_2_LINES } from "../../../../../theme/common/typography";

export interface CardTextProps {
  children: ReactNode;
}

export const CardText = ({
  children,
  ...props /* Spread props to allow for Mui TypographyProps specific prop overrides e.g. "variant". */
}: CardTextProps): JSX.Element => {
  return (
    <Typography variant={TEXT_BODY_400_2_LINES} {...props}>
      {children}
    </Typography>
  );
};
