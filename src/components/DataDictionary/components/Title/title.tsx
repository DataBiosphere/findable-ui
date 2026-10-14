import { TypographyProps } from "@mui/material";
import { JSX } from "react";
import { StyledTitle } from "./title.styles";

/**
 * Data dictionary title.
 * @param props - Component props, passed through to the common Title component.
 * @param props.children - Title text; defaults to "Data Dictionary".
 * @returns The title, rendered by the common Title component.
 */
export const Title = ({
  children = "Data Dictionary",
  ...props
}: TypographyProps): JSX.Element => (
  <StyledTitle {...props}>{children}</StyledTitle>
);
