import type { ChipProps, TooltipProps } from "@mui/material";

/**
 * MUI Chip props, with the chip's slot props extended by a `tooltip` slot.
 * When the tooltip slot is set, the chip renders inside a tooltip.
 */
export interface IdentityChipProps extends Omit<ChipProps, "slotProps"> {
  slotProps?: IdentityChipSlotProps;
}

export type IdentityChipSlotProps = NonNullable<ChipProps["slotProps"]> & {
  tooltip?: Omit<TooltipProps, "children">;
};
