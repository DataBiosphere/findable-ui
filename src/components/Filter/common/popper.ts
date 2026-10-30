import type { PopperProps } from "@mui/material";
import type { Instance } from "@popperjs/core";
import { onScrollFrame } from "../../../utils/scrollFrame";

/**
 * Attribute set on a filter popper while its reference (label or input) is clipped out of view after a page scroll, e.g. by the sidebar shrinking as the footer scrolls in.
 */
export const REFERENCE_HIDDEN_ATTRIBUTE = "data-reference-hidden-by-scroll";

/**
 * Popper.js modifier updating an open filter popper on the frame after each page scroll. A scroll event can fire mid-layout, e.g. while the footer pushes the sticky sidebar up before the sidebar's scroll-driven shrink applies; popper.js would position the panel from that reading and, with no further scroll event, keep it there.
 * Each update after a scroll also marks the popper with REFERENCE_HIDDEN_ATTRIBUTE while popper.js reports its reference clipped out of view; the mark is set only after a scroll, from the real layout. Every update, including one after a resize, clears it once the reference is visible again.
 */
export const UPDATE_AFTER_SCROLL_MODIFIER: NonNullable<
  PopperProps["modifiers"]
>[number] = {
  effect: ({ instance }) => onScrollFrame(() => updateAfterScroll(instance)),
  enabled: true,
  fn: ({ state }): void => {
    if (!state.modifiersData.hide?.isReferenceHidden)
      state.elements.popper.removeAttribute(REFERENCE_HIDDEN_ATTRIBUTE);
  },
  name: "updateAfterScroll",
  phase: "write",
  requiresIfExists: ["hide"],
};

/**
 * Updates the popper, then marks it while its reference is clipped out of view.
 * @param instance - Popper.js instance.
 */
function updateAfterScroll(instance: Instance): void {
  void instance.update().then((state) => {
    state.elements?.popper.toggleAttribute(
      REFERENCE_HIDDEN_ATTRIBUTE,
      Boolean(state.modifiersData?.hide?.isReferenceHidden),
    );
  });
}
