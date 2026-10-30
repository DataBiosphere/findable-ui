import { GridProps, PopperProps } from "@mui/material";
import { POPPER_PROPS as MUI_POPPER_PROPS } from "../../../../../styles/common/mui/popper";
import type { PopperOptions } from "../../../../Filter/common/entities";
import { UPDATE_AFTER_SCROLL_MODIFIER } from "../../../../Filter/common/popper";
import type { ColumnFilterPlacement } from "./types";

/**
 * Edge of its button the column filter panel lines up with.
 */
export const COLUMN_FILTER_PLACEMENT = {
  BOTTOM_END: MUI_POPPER_PROPS.PLACEMENT.BOTTOM_END,
  BOTTOM_START: MUI_POPPER_PROPS.PLACEMENT.BOTTOM_START,
} as const;

export const GRID_PROPS: GridProps = {
  alignItems: "center",
  container: true,
  direction: "row",
  gap: 1,
};

/**
 * Popper.js modifiers shared by both placements: a gap below the button, the panel shifted to stay on screen when it fits neither below nor above (covering the button rather than being cut off), and an update after each page scroll.
 */
const SHARED_MODIFIERS: NonNullable<PopperOptions["modifiers"]> = [
  { name: "offset", options: { offset: [0, 4] } },
  { name: "preventOverflow", options: { altAxis: true, tether: false } },
  UPDATE_AFTER_SCROLL_MODIFIER,
];

/**
 * Popper options by placement: the panel flips above its button when there is no room below, and is fixed to the window, so it follows a sticky button without bouncing.
 */
export const POPPER_OPTIONS: Record<ColumnFilterPlacement, PopperOptions> = {
  [COLUMN_FILTER_PLACEMENT.BOTTOM_END]: {
    modifiers: [
      {
        name: "flip",
        options: { fallbackPlacements: [MUI_POPPER_PROPS.PLACEMENT.TOP_END] },
      },
      ...SHARED_MODIFIERS,
    ],
    strategy: "fixed",
  },
  [COLUMN_FILTER_PLACEMENT.BOTTOM_START]: {
    modifiers: [
      {
        name: "flip",
        options: {
          fallbackPlacements: [MUI_POPPER_PROPS.PLACEMENT.TOP_START],
        },
      },
      ...SHARED_MODIFIERS,
    ],
    strategy: "fixed",
  },
};

export const POPPER_PROPS: Omit<PopperProps, "open"> = {
  transition: true,
};
