import type { ChipProps } from "@mui/material";
import type { STATUS_CHIP_PROPS } from "./constants";

/**
 * A `StatusChip` colour, one of `STATUS_CHIP_PROPS.COLOR`.
 */
export type StatusChipColor =
  (typeof STATUS_CHIP_PROPS.COLOR)[keyof typeof STATUS_CHIP_PROPS.COLOR];

/**
 * The MUI `Chip` props a status chip takes: `className`, `label` and `ref`, with a required `color` from
 * `STATUS_CHIP_PROPS.COLOR`. A status is a label, not a control, so it takes no `onClick`, `onDelete`, `icon` or
 * `avatar`, and `StatusChip` fixes its size and variant.
 */
export interface StatusChipProps extends Pick<
  ChipProps,
  "className" | "label" | "ref"
> {
  color: StatusChipColor;
}
