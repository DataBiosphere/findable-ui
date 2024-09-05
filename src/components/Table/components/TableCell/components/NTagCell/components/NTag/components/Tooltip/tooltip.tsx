import {
  Tooltip as MTooltip,
  TooltipProps as MTooltipProps,
  PopperProps,
} from "@mui/material";
import { detectOverflow } from "@popperjs/core";
import { State } from "@popperjs/core/lib/types";
import React, { useMemo, useState } from "react";
import { TooltipContent } from "./tooltip.styles";

const DEFAULT_FLIP_MODIFIER = {
  enabled: true,
  name: "flip",
  options: {
    fallbackPlacements: ["bottom", "right", "left"],
  },
};

const DEFAULT_PREVENT_OVERFLOW_MODIFIER = {
  enabled: true,
  name: "preventOverflow",
  options: {
    padding: 16,
  },
};

export interface TooltipProps extends MTooltipProps {
  className?: string;
}

export const Tooltip = ({
  children,
  className,
  title,
  ...props /* Spread props to allow for Mui Tooltip specific prop overrides. */
}: TooltipProps): JSX.Element => {
  const [maxHeight, setMaxHeight] = useState<number>();
  const modifiers: PopperProps["modifiers"] = useMemo(
    () => [
      {
        enabled: true,
        fn: ({ state }): void => setMaxHeight(calculateMaxHeight(state)),
        name: "maxHeight",
        phase: "main",
        requiresIfExists: ["offset"],
      },
      DEFAULT_FLIP_MODIFIER,
      DEFAULT_PREVENT_OVERFLOW_MODIFIER,
    ],
    []
  );
  return (
    <MTooltip
      arrow
      className={className}
      onClose={(): void => setMaxHeight(undefined)}
      slotProps={{
        popper: { modifiers },
        tooltip: { style: { display: "flex", maxHeight, padding: 0 } },
      }}
      title={<TooltipContent>{title}</TooltipContent>}
      {...props}
    >
      {children}
    </MTooltip>
  );
};

/**
 * Calculate the max height of the tooltip based on the current popper modifier state.
 * @param state - Popper modifier state.
 * @returns tooltip maximum height.
 */
function calculateMaxHeight(state: State): number | undefined {
  const overflow = detectOverflow(state);
  const { placement } = state;
  if (placement === "left" || placement === "right") {
    return window.innerHeight - 32;
  }
  if (placement === "top") {
    return state.rects.popper.height - overflow.top - 24;
  }
  if (placement === "bottom") {
    return state.rects.popper.height - overflow.bottom - 24;
  }
}
