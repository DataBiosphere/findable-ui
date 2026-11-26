import type { ChipOwnProps } from "@mui/material";
import { CHIP_PROPS } from "./constants";

/**
 * MUI `Chip` color and variant combinations that findable-ui's apps reuse, spread onto a chip:
 * `<Chip {...CHIP_PRESETS.DEFAULT_OUTLINED} label="Optional" />`.
 */
export const CHIP_PRESETS = {
  DEFAULT_OUTLINED: {
    color: CHIP_PROPS.COLOR.DEFAULT,
    variant: CHIP_PROPS.VARIANT.OUTLINED,
  },
} as const satisfies Record<string, Partial<ChipOwnProps>>;
