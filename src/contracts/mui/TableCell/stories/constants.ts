import type { TableCellProps } from "@mui/material";
import { TABLE_CELL_PROPS } from "../constants";

/**
 * The paddings findable-ui styles.
 */
export const PADDINGS: TableCellProps["padding"][] = [
  TABLE_CELL_PROPS.PADDING.NORMAL,
  TABLE_CELL_PROPS.PADDING.CHECKBOX,
  TABLE_CELL_PROPS.PADDING.NONE,
];

/**
 * The sizes findable-ui styles.
 */
export const SIZES: TableCellProps["size"][] = [
  TABLE_CELL_PROPS.SIZE.MEDIUM,
  TABLE_CELL_PROPS.SIZE.SMALL,
];

/**
 * The variants the Findable-Contract Figma library's `mui/TableCell` has.
 */
export const VARIANTS: TableCellProps["variant"][] = [
  TABLE_CELL_PROPS.VARIANT.HEAD,
  TABLE_CELL_PROPS.VARIANT.BODY,
];
