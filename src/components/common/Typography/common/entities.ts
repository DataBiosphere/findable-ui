import { TypographyProps as MTypographyProps } from "@mui/material";

export type TypographyProps =
  | Omit<MTypographyProps, "children" | "component" | "ref">
  | undefined;
