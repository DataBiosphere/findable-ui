import type { SerializedStyles } from "@emotion/react";
import { css, keyframes } from "@emotion/react";
import {
  FOOTER_HEIGHT_VAR,
  FOOTER_VIEW_TIMELINE,
} from "../../../components/Layout/components/Footer/common/constants";
import { SUPPORTS_SCROLL_DRIVEN_ANIMATIONS } from "../constants/supports";
import { pinned } from "./pinned";

/**
 * Pins a column (e.g. a sidebar, or a content page's navigation and outline)
 * at the given offset from the top, fits it to the window below that offset,
 * and shrinks it as the footer scrolls in, by as much of the footer as is in
 * view, so the end of its grid area doesn't push its top up. Where
 * scroll-driven animations aren't supported, the footer pushes the column up.
 * @param top - Top offset, e.g. the header height variable.
 * @returns Pinned column styles.
 */
export function pinnedAboveFooter(top: string): SerializedStyles {
  const shrink = keyframes`
    from {
      max-height: calc(100vh - ${top});
    }

    to {
      max-height: calc(100vh - ${top} - ${FOOTER_HEIGHT_VAR});
    }
  `;
  return css`
    max-height: calc(100vh - ${top});
    ${pinned(top)};

    @supports ${SUPPORTS_SCROLL_DRIVEN_ANIMATIONS} {
      animation: ${shrink} linear both;
      animation-range: entry 0% entry 100%;
      animation-timeline: ${FOOTER_VIEW_TIMELINE};
    }
  `;
}
