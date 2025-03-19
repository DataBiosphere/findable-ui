import styled from "@emotion/styled";
import { LayoutSpacing } from "../../../../hooks/UseLayoutSpacing/types";
import { LAYOUT_SPACING } from "../../constants";

const PB = LAYOUT_SPACING.CONTENT_PADDING_BOTTOM; /* bottom padding */
const PT = LAYOUT_SPACING.CONTENT_PADDING_TOP; /* top padding */
const TITLE_HEIGHT = LAYOUT_SPACING.TITLE_HEIGHT; /* title height */

export const Layout = styled("div")<LayoutSpacing>`
  grid-column: 2;
  grid-row: 1;
  padding-bottom: ${PB}px;
  padding-top: ${({ top }) => top + TITLE_HEIGHT + PT}px;
  z-index: 1; /* not required, but helpful in that the entities are always on top */
`;
