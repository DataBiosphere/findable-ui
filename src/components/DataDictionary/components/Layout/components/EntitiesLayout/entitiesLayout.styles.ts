import styled from "@emotion/styled";
import { LayoutSpacing } from "../../../../hooks/UseLayoutSpacing/types";
import { LAYOUT_SPACING } from "../../constants";

export const Layout = styled("div")<LayoutSpacing>`
  grid-column: 2;
  grid-row: 1;
  padding: ${({ top }) =>
      top + LAYOUT_SPACING.TITLE_HEIGHT + LAYOUT_SPACING.CONTENT_PADDING_TOP}px
    0 ${LAYOUT_SPACING.CONTENT_PADDING_BOTTOM}px;
  z-index: 1; /* not required, but helpful in that the entities are always on top */
`;
