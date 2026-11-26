import type { ChipProps } from "@mui/material";

/**
 * The MUI `Chip` props an N tag chip takes: `className`, `label` and `ref`. A count tag is a label, not a control, so
 * it takes no `onClick`, `onDelete`, `icon` or `avatar`, and `NTagChip` fixes its colour, size and variant.
 */
export type NTagChipProps = Pick<ChipProps, "className" | "label" | "ref">;
