import { Chip as MChip, Tooltip } from "@mui/material";
import { type JSX, type MouseEvent } from "react";
import { CHIP_PROPS } from "../../../../../../../../../../styles/common/mui/chip";
import type { IdentityChipProps } from "./types";

/**
 * Renders a chip, wrapped in a tooltip when the tooltip slot is set.
 * `describeChild` defaults on, making the tooltip the chip's description rather
 * than its accessible name, so the chip keeps its label as its name.
 * The tooltip opens on hover, touch (press and hold) or keyboard focus, but
 * chips aren't focusable by default. If the tooltip carries information shown
 * nowhere else, pass `tabIndex: 0` on the chip so keyboard users can open it.
 * Clicks on a tooltip chip stop at the chip, so presses that open the tooltip
 * on touch devices don't also toggle row expansion.
 * @param props - Identity chip props.
 * @returns The chip, in a tooltip when one is given.
 */
export const Chip = (props: IdentityChipProps): JSX.Element => {
  const { slotProps, ...chipProps } = props;
  const { tooltip: tooltipProps, ...chipSlotProps } = slotProps ?? {};

  // Not clickable: onClick only stops propagation, so the chip stays a plain div.
  const chip = (
    <MChip
      {...chipProps}
      clickable={false}
      onClick={
        tooltipProps
          ? (e: MouseEvent<HTMLDivElement>): void => e.stopPropagation()
          : undefined
      }
      slotProps={chipSlotProps}
      variant={chipProps.variant ?? CHIP_PROPS.VARIANT.STATUS}
    />
  );

  if (!tooltipProps) return chip;

  return (
    <Tooltip arrow describeChild {...tooltipProps}>
      {chip}
    </Tooltip>
  );
};
