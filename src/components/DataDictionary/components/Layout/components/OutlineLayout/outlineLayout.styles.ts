import styled from "@emotion/styled";
import { mediaTabletDown } from "../../../../../../styles/common/mixins/breakpoints";
import { LayoutSpacing } from "../../../../hooks/UseLayoutSpacing/types";
import { LAYOUT_SPACING } from "../../constants";

const PB = LAYOUT_SPACING.CONTENT_PADDING_BOTTOM; /* bottom padding */
const PT = LAYOUT_SPACING.CONTENT_PADDING_TOP; /* top padding */
const TITLE_HEIGHT = LAYOUT_SPACING.TITLE_HEIGHT; /* title height */

export const Layout = styled("div")<LayoutSpacing>`
  grid-column: 1;
  grid-row: 1;
  margin-bottom: ${({ bottom }) =>
    -bottom}px; /* required; prevents sticky element from scrolling when footer scrolls into viewport */
  max-height: 100vh;
  overflow: hidden;
  padding-bottom: ${({ bottom }) => bottom}px; /* footer height */
  padding-top: ${({ top }) => top + TITLE_HEIGHT}px;
  position: sticky;
  top: 0;

  ${mediaTabletDown} {
    display: none;
  }
`;

export const LayoutScroller = styled("div")`
  height: 100%;
  overflow: auto;
  padding: ${PT}px 0 ${PB}px;
`;
