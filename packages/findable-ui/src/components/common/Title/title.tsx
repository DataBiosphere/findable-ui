import { Typography } from "@mui/material";
import React from "react";

export type HeroTitle = string;

export interface TitleProps {
  title: HeroTitle;
}

export const Title = ({ title }: TitleProps): JSX.Element => {
  return (
    <Typography color="ink.main" component="h1" variant="text-heading-large">
      {title}
    </Typography>
  );
};
