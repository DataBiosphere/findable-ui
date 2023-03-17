import { Typography } from "@mui/material";
import React from "react";

export interface SectionTitleProps {
  className?: string;
  title: string;
}

export const SectionTitle = ({
  className,
  title,
}: SectionTitleProps): JSX.Element => {
  return (
    <Typography
      align="left"
      className={className}
      color="ink.main"
      component="h3"
      variant="text-body-large-500"
    >
      {title}
    </Typography>
  );
};
