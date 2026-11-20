import type { ButtonProps, CSSObject, Theme } from "@mui/material";

/**
 * One entry of `MuiButton`'s `styleOverrides.root.variants`: the props it matches and the styles it applies.
 */
export interface ButtonVariant {
  props: Partial<ButtonProps>;
  style: CSSObject | ((args: { theme: Theme }) => CSSObject);
}
