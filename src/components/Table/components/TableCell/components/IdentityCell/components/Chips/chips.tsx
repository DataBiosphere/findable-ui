import { Stack } from "@mui/material";
import { type JSX } from "react";
import { STACK_PROPS } from "../../../../../../../../styles/common/mui/stack";
import { Chip } from "./components/Chip/chip";
import type { ChipsProps } from "./types";

/**
 * Renders the identity cell's chips as a wrapping row, or nothing when there
 * are no chips.
 * @param props - Component props.
 * @param props.chips - Chip props, one per chip.
 * @returns The chip row, or null when there are no chips.
 */
export const Chips = ({ chips = [] }: ChipsProps): JSX.Element | null => {
  if (chips.length === 0) return null;
  return (
    <Stack
      direction={STACK_PROPS.DIRECTION.ROW}
      flexWrap={STACK_PROPS.FLEX_WRAP.WRAP}
      spacing={2}
      useFlexGap
    >
      {chips.map((chip, i) => (
        // Chips carry no stable id, and the list is static per render.
        <Chip key={i} {...chip} />
      ))}
    </Stack>
  );
};
