import styled from "@emotion/styled";
import { mediaTabletDown } from "../../../../../../styles/common/mixins/breakpoints";
import { LayoutSpacing } from "../../../../hooks/UseLayoutSpacing/types";
import { LAYOUT_SPACING } from "../../constants";

export const Layout = styled("div")<LayoutSpacing>`
  grid-column: 1;
  grid-row: 1;
  margin-bottom: ${({ bottom }) =>
    -bottom}px; /* required; prevents sticky element from scrolling when footer scrolls into viewport */
  max-height: 100vh;
  overflow: hidden;
  padding-bottom: ${({ bottom }) => bottom}px;
  padding-top: ${({ top }) => top + LAYOUT_SPACING.TITLE_HEIGHT}px;
  position: sticky;
  top: 0;

  ${mediaTabletDown} {
    display: none;
  }
`;

export const LayoutScroller = styled("div")`
  height: 100%;
  overflow: auto;
  padding: ${LAYOUT_SPACING.CONTENT_PADDING_TOP}px 0
    ${LAYOUT_SPACING.CONTENT_PADDING_BOTTOM}px;
`;
