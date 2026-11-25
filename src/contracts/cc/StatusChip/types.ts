import type { ChipProps } from "@mui/material";
import type { STATUS_CHIP_PROPS } from "./constants";

/**
 * A `StatusChip` colour, one of `STATUS_CHIP_PROPS.COLOR`.
 */
export type StatusChipColor =
  (typeof STATUS_CHIP_PROPS.COLOR)[keyof typeof STATUS_CHIP_PROPS.COLOR];

/**
 * MUI `Chip` props without `size` or `variant`, with a required `color` from `STATUS_CHIP_PROPS.COLOR`. The chip is
 * always the theme's small size.
 */
export interface StatusChipProps extends Omit<
  ChipProps,
  "color" | "size" | "variant"
> {
  color: StatusChipColor;
}
