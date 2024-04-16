import { Typography } from "@mui/material";
import React, { ReactNode } from "react";

export interface TypographyWordBreakProps {
  children: ReactNode;
}

export const TypographyWordBreak = ({
  children,
  ...props /* Spread props to allow for Typography specific props e.g. "color". */
}: TypographyWordBreakProps): JSX.Element => {
  return (
    <Typography
      component="span"
      sx={{ wordBreak: "break-word" }}
      variant="inherit"
      {...props}
    >
      {children}
    </Typography>
  );
};
