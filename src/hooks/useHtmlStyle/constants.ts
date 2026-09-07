import { CSSPropHyphen } from "./types";

export const PROPERTY: Record<string, CSSPropHyphen> = {
  /**
   * Consumed by `ScrollShell` as its `scroll-padding-top`. A custom property
   * rather than `scroll-padding-top` itself because the scrollport is the shell,
   * not the HTML element, and the value is only known further down the tree.
   */
  SCROLL_PADDING_TOP: "--scroll-padding-top",
};
