import type { CSSObject, TableCellProps, Theme } from "@mui/material";

/**
 * One entry of `MuiTableCell`'s `styleOverrides.root.variants`: the props it matches and the styles it applies.
 */
export interface TableCellVariant {
  props: Partial<TableCellProps>;
  style: CSSObject | ((args: { theme: Theme }) => CSSObject);
}
