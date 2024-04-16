import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { TEXT_BODY_SMALL_400_2_LINES } from "../../../../../theme/common/typography";

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
      variant={TEXT_BODY_SMALL_400_2_LINES}
      {...props}
    >
      {children}
    </Typography>
  );
};
