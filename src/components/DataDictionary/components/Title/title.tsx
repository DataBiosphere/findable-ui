import { TypographyProps } from "@mui/material";
import { JSX } from "react";
import { StyledTitle } from "./title.styles";

export const Title = ({
  children = "Data Dictionary",
  ...props
}: TypographyProps): JSX.Element => (
  <StyledTitle {...props}>{children}</StyledTitle>
);
