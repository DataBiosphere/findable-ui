import type { PopperProps } from "@mui/material";
import type { Instance, State } from "@popperjs/core";
import { PROPERTY } from "../../../hooks/useHtmlStyle/constants";
import type { PopperOptions } from "./entities";
import { onScrollFrame } from "./scrollFrame";

/**
 * Name of the after-scroll update modifier.
 */
const UPDATE_AFTER_SCROLL = "updateAfterScroll";

/**
 * Gap kept between a filter panel and the edges of the visible area, in pixels.
 */
const EDGE_PADDING = 8;

/**
 * Popper options with header padding, cached by base options and header height, so each is a stable object: MUI re-creates the popper when its options change.
 */
const HEADER_PADDED_OPTIONS = new WeakMap<
  PopperOptions,
  Map<number, PopperOptions>
>();

/**
 * Attribute set on a filter popper while its reference (label, input or button) is out of view after a scroll: clipped, e.g. scrolled out of the sidebar or cut off as the sidebar shrinks when the footer scrolls in, or passed under the header.
 */
export const REFERENCE_HIDDEN_ATTRIBUTE = "data-reference-hidden-by-scroll";

/**
 * Popper.js modifier updating an open filter popper on the frame after each scroll, of the page or of a scrolling element such as the sidebar. A scroll event can fire mid-layout, e.g. while the footer pushes the sticky sidebar up before the sidebar's scroll-driven shrink applies; popper.js would position the panel from that reading and, with no further scroll event, keep it there.
 * Each update works out whether the reference is out of view (see isReferenceHidden). After a scroll, the popper is marked with REFERENCE_HIDDEN_ATTRIBUTE while it is; the mark is set only after a scroll, from the real layout. Every update, including one after a resize, clears it once the reference is in view again.
 */
export const UPDATE_AFTER_SCROLL_MODIFIER: NonNullable<
  PopperProps["modifiers"]
>[number] = {
  effect: ({ instance, state }) =>
    onScrollFrame(() => updateAfterScroll(instance), state.elements.popper),
  enabled: true,
  fn: ({ name, state }): void => {
    const hidden = isReferenceHidden(state);
    state.modifiersData[name] = { isReferenceHidden: hidden };
    if (!hidden)
      state.elements.popper.removeAttribute(REFERENCE_HIDDEN_ATTRIBUTE);
  },
  name: UPDATE_AFTER_SCROLL,
  phase: "write",
  requiresIfExists: ["hide"],
};

/**
 * Returns the measured header height, or 0 when it has not been measured or there is no document.
 * @returns The header height in pixels.
 */
export function getHeaderHeight(): number {
  if (typeof document === "undefined") return 0;
  const height = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      PROPERTY.HEADER_HEIGHT,
    ),
  );
  return Number.isNaN(height) ? 0 : height;
}

/**
 * Returns true when the popper's reference is out of view: clipped by its scrolling ancestors or the window, as popper.js's hide modifier reports, or passed under the header, which covers it without clipping it.
 * @param state - Popper.js state.
 * @returns True if the reference is out of view.
 */
function isReferenceHidden(state: State): boolean {
  if (state.modifiersData.hide?.isReferenceHidden) return true;
  const { reference } = state.elements;
  if (!(reference instanceof Element)) return false;
  return reference.getBoundingClientRect().top < getHeaderHeight();
}

/**
 * Updates the popper, then marks it while its reference is out of view.
 * @param instance - Popper.js instance.
 */
function updateAfterScroll(instance: Instance): void {
  void instance.update().then((state) => {
    state.elements?.popper.toggleAttribute(
      REFERENCE_HIDDEN_ATTRIBUTE,
      Boolean(state.modifiersData?.[UPDATE_AFTER_SCROLL]?.isReferenceHidden),
    );
  });
}

/**
 * Returns the popper options with the area under the header treated as off screen: popper.js's flip and preventOverflow keep the panel clear of the header, flipping to a fallback placement rather than going under it.
 * The result is cached by options and header height, so it stays the same object until the header height changes.
 * @param options - Base popper options.
 * @returns Popper options with header padding.
 */
export function withHeaderPadding(options: PopperOptions): PopperOptions {
  const headerHeight = getHeaderHeight();
  let byHeight = HEADER_PADDED_OPTIONS.get(options);
  if (!byHeight) {
    byHeight = new Map();
    HEADER_PADDED_OPTIONS.set(options, byHeight);
  }
  const cached = byHeight.get(headerHeight);
  if (cached) return cached;
  const padding = {
    bottom: EDGE_PADDING,
    left: EDGE_PADDING,
    right: EDGE_PADDING,
    top: headerHeight + EDGE_PADDING,
  };
  const padded: PopperOptions = {
    ...options,
    modifiers: [
      ...(options.modifiers ?? []),
      { name: "flip", options: { padding } },
      { name: "preventOverflow", options: { padding } },
    ],
  };
  byHeight.set(headerHeight, padded);
  return padded;
}
