import type { ChipProps } from "@mui/material";

/**
 * The MUI `Chip` props an N tag chip takes: `className`, `label`, `ref` and `tabIndex`. A count tag is a label, not a
 * control, so it takes no `onClick`, `onDelete`, `icon` or `avatar`, and `NTagChip` fixes its colour, size and variant.
 * `tabIndex` makes the tag a tab stop, so a tooltip on it opens on keyboard focus as well as on hover.
 */
export type NTagChipProps = Pick<
  ChipProps,
  "className" | "label" | "ref" | "tabIndex"
>;
