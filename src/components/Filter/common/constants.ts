import type { PopperProps } from "@mui/material";
import { onScrollFrame } from "../../../utils/scrollFrame";

export const LIST_ITEM_HEIGHT = 40;
export const LIST_MARGIN = 8; // list margin (top or bottom).
export const MAX_DISPLAYABLE_LIST_ITEMS = 8;
export const MAX_LIST_HEIGHT_PX =
  (MAX_DISPLAYABLE_LIST_ITEMS + 0.5) * LIST_ITEM_HEIGHT + LIST_MARGIN; // 8px list top margin.

/**
 * Popper.js modifier updating an open filter popper on the frame after each page scroll. A scroll event can fire mid-layout, e.g. while the footer pushes the sticky sidebar up before the sidebar's scroll-driven shrink applies; popper.js would position the panel from that reading and, with no further scroll event, keep it there.
 */
export const UPDATE_AFTER_SCROLL_MODIFIER: NonNullable<
  PopperProps["modifiers"]
>[number] = {
  effect: ({ instance }) => onScrollFrame(() => void instance.update()),
  enabled: true,
  fn: (): void => undefined,
  name: "updateAfterScroll",
  phase: "write",
};
