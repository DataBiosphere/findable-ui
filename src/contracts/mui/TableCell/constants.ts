import type { TableCellProps } from "@mui/material";

const ALIGN = {
  CENTER: "center",
  INHERIT: "inherit",
  JUSTIFY: "justify",
  LEFT: "left",
  RIGHT: "right",
} as const satisfies Record<string, TableCellProps["align"]>;

const PADDING = {
  CHECKBOX: "checkbox",
  NONE: "none",
  NORMAL: "normal",
} as const satisfies Record<string, TableCellProps["padding"]>;

const SIZE = {
  MEDIUM: "medium",
  SMALL: "small",
} as const satisfies Record<string, TableCellProps["size"]>;

const VARIANT = {
  BODY: "body",
  FOOTER: "footer",
  HEAD: "head",
} as const satisfies Record<string, TableCellProps["variant"]>;

/**
 * MUI `TableCell`'s prop values, so components don't write bare strings:
 * `variant={TABLE_CELL_PROPS.VARIANT.HEAD}`.
 */
export const TABLE_CELL_PROPS = {
  ALIGN,
  PADDING,
  SIZE,
  VARIANT,
} as const;
