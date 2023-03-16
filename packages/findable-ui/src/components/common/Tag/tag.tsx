import { Typography } from "@mui/material";
import React, { ReactNode } from "react";

export interface TagProps {
  children: ReactNode;
  className?: string;
}

export const Tag = ({ children, className }: TagProps): JSX.Element => {
  return (
    <Typography className={className} component="span" variant="text-body-500">
      {children}
    </Typography>
  );
};
