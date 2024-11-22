import { TableCellProps } from "@mui/material";

type TableCellPropsOptions = {
  ALIGN: typeof ALIGN;
  PADDING: typeof PADDING;
  SIZE: typeof SIZE;
  VARIANT: typeof VARIANT;
};

const ALIGN: Record<string, TableCellProps["align"]> = {
  CENTER: "center",
  INHERIT: "inherit",
  JUSTIFY: "justify",
  LEFT: "left",
  RIGHT: "right",
};

const PADDING: Record<string, TableCellProps["padding"]> = {
  CHECKBOX: "checkbox",
  NONE: "none",
  NORMAL: "normal",
};

const SIZE: Record<string, TableCellProps["size"]> = {
  MEDIUM: "medium",
  SMALL: "small",
};

const VARIANT: Record<string, TableCellProps["variant"]> = {
  BODY: "body",
  FOOTER: "footer",
  HEAD: "head",
};

export const TABLE_CELL_PROPS: TableCellPropsOptions = {
  ALIGN,
  PADDING,
  SIZE,
  VARIANT,
};
