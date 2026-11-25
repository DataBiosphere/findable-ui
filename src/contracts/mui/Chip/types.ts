import type { ChipProps, CSSObject, Theme } from "@mui/material";

/**
 * One entry of `MuiChip`'s `styleOverrides.root.variants`: the props it matches and the styles it applies.
 */
export interface ChipVariant {
  props: Partial<ChipProps>;
  style: CSSObject | ((args: { theme: Theme }) => CSSObject);
}
