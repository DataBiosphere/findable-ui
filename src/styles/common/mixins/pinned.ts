import type { SerializedStyles } from "@emotion/react";
import { css } from "@emotion/react";

/**
 * For regions that pin inside the HTML scroll-padding-top (the header, the data
 * dictionary title and filters): their focusable elements are always in view, so
 * focusing one (e.g. a menu restoring focus to its trigger) must not scroll the
 * page to clear the padding. Not for regions that scroll internally, where the
 * margin would also stop them scrolling a focused element into view.
 */
export const pinnedFocus = css`
  & :is(a, button, input, select, textarea, [tabindex]) {
    scroll-margin-top: -100vh;
  }
`;

/**
 * Pins an element at the given offset from the top as the page scrolls.
 * @param top - Top offset, e.g. the header height variable.
 * @returns Pinned styles.
 */
export function pinned(top: string): SerializedStyles {
  return css`
    position: sticky;
    top: ${top};
  `;
}
