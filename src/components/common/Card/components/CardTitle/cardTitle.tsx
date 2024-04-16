import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { TEXT_BODY_LARGE_500 } from "../../../../../theme/common/typography";

export interface CardTitleProps {
  children: ReactNode;
}

export const CardTitle = ({
  children,
  ...props /* Spread props to allow for Mui TypographyProps specific prop overrides e.g. "variant". */
}: CardTitleProps): JSX.Element => {
  return (
    <Typography component="h4" variant={TEXT_BODY_LARGE_500} {...props}>
      {children}
    </Typography>
  );
};
