import styled from "@emotion/styled";
import { bpDown1024 } from "../../../../../../styles/common/mixins/breakpoints";
import { LAYOUT_SPACING } from "../../constants";

const PB = LAYOUT_SPACING.CONTENT_PADDING_BOTTOM; /* bottom padding */
const PT = LAYOUT_SPACING.OUTLINE_PADDING_TOP; /* top padding */
const TITLE_HEIGHT = LAYOUT_SPACING.TITLE_HEIGHT; /* title height */

export const Layout = styled("div")`
  /* Content-sized rather than stretched to the grid row, so a short outline sits
     under the title instead of filling the column. */
  align-self: start;
  /* Flex column so the scroller below is bounded by this element's used height.
     A percentage height would not resolve: this element is content-sized and
     merely capped by max-height, which does not make its height definite. */
  display: flex;
  flex-direction: column;
  grid-column: 1;
  grid-row: 1;
  /* The scrollport, not the viewport: ScrollShell is a size container, and it
     is a header shorter than 100vh. */
  max-height: 100cqh;
  overflow: hidden;
  padding-top: ${TITLE_HEIGHT + PT}px;
  position: sticky;
  /* Sticky clamps this element to its containing block — the grid row — and the
     footer scrolls inside the scrollport after that row ends. So at the very end
     of the scroll the outline is pushed up by the footer's height, and if it is
     at its max-height its topmost entries pass under the sticky title. Accepted
     rather than compensated: reserving the height either hides a footer's worth
     of the outline from first paint (padding, which max-height takes out of the
     content box) or overhangs it behind the footer (negative margin alone), and
     both cost more than the moment they fix. Only reachable while the outline is
     at its cap, i.e. a long outline or a short viewport. */
  top: 0;

  ${bpDown1024} {
    display: none;
  }
`;

export const LayoutScroller = styled("div")`
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding-bottom: ${PB}px;
`;
