import { Chip as MChip, Tooltip } from "@mui/material";
import { type JSX } from "react";
import { CHIP_PROPS } from "../../../../../../../../../../styles/common/mui/chip";
import type { IdentityChipProps } from "./types";

/**
 * Renders a chip, wrapped in a tooltip when the tooltip slot is set.
 * `describeChild` defaults on, making the tooltip the chip's description rather
 * than its accessible name, so the chip keeps its label as its name.
 * @param props - Identity chip props.
 * @returns The chip, in a tooltip when one is given.
 */
export const Chip = (props: IdentityChipProps): JSX.Element => {
  const { slotProps, ...chipProps } = props;
  const { tooltip: tooltipProps, ...chipSlotProps } = slotProps ?? {};

  const chip = (
    <MChip
      {...chipProps}
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
