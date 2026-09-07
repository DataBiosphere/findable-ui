import styled from "@emotion/styled";
import { bpDown1024 } from "../../../../../../styles/common/mixins/breakpoints";
import { LAYOUT_SPACING } from "../../constants";
import { EntitiesSpacing } from "./types";

const PB = LAYOUT_SPACING.CONTENT_PADDING_BOTTOM; /* bottom padding */
const PT = LAYOUT_SPACING.CONTENT_PADDING_TOP; /* top padding */

export const Layout = styled("div")<EntitiesSpacing>`
  display: grid;
  gap: 16px;
  grid-column: 2;
  grid-row: 1;
  padding-bottom: ${PB}px;
  padding-top: ${({ top }) => top}px; /* filters height */
  z-index: 1; /* not required, but helpful in that the entities are always on top */

  ${bpDown1024} {
    grid-column: 1;
    grid-row: auto;
    padding-top: ${PT}px;
  }
`;
