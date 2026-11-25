import type { ChipProps } from "@mui/material";
import type { STATUS_CHIP_PROPS } from "./constants";

/**
 * A `StatusChip` colour, one of `STATUS_CHIP_PROPS.COLOR`.
 */
export type StatusChipColor =
  (typeof STATUS_CHIP_PROPS.COLOR)[keyof typeof STATUS_CHIP_PROPS.COLOR];

/**
 * MUI `Chip` props without `size` or `variant`, which `StatusChip` fixes, with a required `color` from
 * `STATUS_CHIP_PROPS.COLOR`.
 */
export interface StatusChipProps extends Omit<
  ChipProps,
  "color" | "size" | "variant"
> {
  color: StatusChipColor;
}
