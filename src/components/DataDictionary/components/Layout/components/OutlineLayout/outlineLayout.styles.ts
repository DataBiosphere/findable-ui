import styled from "@emotion/styled";
import { bpDown1024 } from "../../../../../../styles/common/mixins/breakpoints";
import { pinned } from "../../../../../../styles/common/mixins/pinned";
import { FOOTER_HEIGHT_VAR } from "../../../../../Layout/components/Footer/common/constants";
import { LAYOUT_SPACING, TITLE_BOTTOM } from "../../constants";

const PB = LAYOUT_SPACING.CONTENT_PADDING_BOTTOM; /* bottom padding */
const PT = LAYOUT_SPACING.OUTLINE_PADDING_TOP; /* top padding */

/**
 * Clears the footer in every browser, with footer-height padding the footer
 * covers as it scrolls in. The cost is a footer's height of blank window below
 * the outline until the footer arrives. If outlines grow long enough for that
 * space to matter, move to `pinnedAboveFooter(TITLE_BOTTOM)` (as the content
 * layout and sidebar do), which uses the whole window but needs scroll-driven
 * animations.
 */
export const Layout = styled("div")`
  grid-area: outline;
  margin-bottom: calc(
    -1 * ${FOOTER_HEIGHT_VAR}
  ); /* with the matching padding, keeps the outline pinned whole while the footer scrolls into view */
  max-height: calc(100vh - ${TITLE_BOTTOM});
  overflow: hidden;
  padding-bottom: ${FOOTER_HEIGHT_VAR};
  padding-top: ${PT}px;
  ${pinned(TITLE_BOTTOM)}; /* below the sticky title */

  ${bpDown1024} {
    display: none;
  }
`;

export const LayoutScroller = styled("div")`
  height: 100%;
  overflow: auto;
  padding-bottom: ${PB}px;
`;
