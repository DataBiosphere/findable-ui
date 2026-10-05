import type { ChipProps, TooltipProps } from "@mui/material";

/**
 * MUI Chip props, without click, delete and disabled behaviour (identity chips
 * are not interactive), and with the chip's slot props extended by a `tooltip`
 * slot. When the tooltip slot is set, the chip renders inside a tooltip. The
 * tooltip opens on hover, touch (press and hold) or keyboard focus, but chips
 * aren't focusable by default. If the tooltip carries information shown
 * nowhere else, pass `tabIndex: 0` on the chip so keyboard users can open it.
 */
export interface IdentityChipProps extends Omit<
  ChipProps,
  "clickable" | "disabled" | "onClick" | "onDelete" | "slotProps"
> {
  slotProps?: IdentityChipSlotProps;
}

export type IdentityChipSlotProps = NonNullable<ChipProps["slotProps"]> & {
  tooltip?: Omit<TooltipProps, "children">;
};
