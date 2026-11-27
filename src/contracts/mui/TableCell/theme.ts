import type { Components, Theme } from "@mui/material";
import { FONT } from "../../../styles/common/constants/font";
import { PALETTE } from "../../../styles/common/constants/palette";
import { TABLE_CELL_PROPS } from "./constants";
import type { TableCellVariant } from "./types";

export const SIZE_MEDIUM: TableCellVariant = {
  props: { size: TABLE_CELL_PROPS.SIZE.MEDIUM },
  style: { padding: "10px 16px" },
};

export const SIZE_SMALL: TableCellVariant = {
  props: { size: TABLE_CELL_PROPS.SIZE.SMALL },
  style: { padding: "8px 16px" },
};

export const PADDING_CHECKBOX: TableCellVariant = {
  props: { padding: TABLE_CELL_PROPS.PADDING.CHECKBOX },
  style: { paddingRight: 0, width: "unset" },
};

export const PADDING_NONE: TableCellVariant = {
  props: { padding: TABLE_CELL_PROPS.PADDING.NONE },
  style: { padding: 0 },
};

export const VARIANT_BODY: TableCellVariant = {
  props: { variant: TABLE_CELL_PROPS.VARIANT.BODY },
  style: {
    font: FONT.BODY_400,
    // eslint-disable-next-line sort-keys -- disabling key order for readability
    "& mark": {
      backgroundColor: PALETTE.WARNING_LIGHT,
      color: "inherit",
      padding: "2px 0",
    },
  },
};

export const VARIANT_HEAD: TableCellVariant = {
  props: { variant: TABLE_CELL_PROPS.VARIANT.HEAD },
  style: {
    backgroundColor: PALETTE.SMOKE_LIGHTEST,
    font: FONT.BODY_SMALL_500,
  },
};

/**
 * `MuiTableCell`'s variants, in cascade order: a later entry wins over an earlier one, so the padding entries
 * override the size entries' padding. MUI's theme merge replaces arrays, so an app overrides one variant by spreading
 * this list and appending its own entry with the same `props`.
 */
export const TABLE_CELL_VARIANTS: TableCellVariant[] = [
  SIZE_MEDIUM,
  SIZE_SMALL,
  PADDING_CHECKBOX,
  PADDING_NONE,
  VARIANT_BODY,
  VARIANT_HEAD,
];

export const MuiTableCell: Components<Theme>["MuiTableCell"] = {
  styleOverrides: {
    root: {
      minHeight: 56,
      stickyHeader: {
        boxShadow: `0 1px 0 ${PALETTE.SMOKE_MAIN}`,
      },
      variants: TABLE_CELL_VARIANTS,
    },
  },
};
