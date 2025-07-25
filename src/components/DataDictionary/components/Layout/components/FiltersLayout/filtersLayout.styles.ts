import styled from "@emotion/styled";
import { LayoutSpacing } from "../../../../../../hooks/UseLayoutSpacing/types";
import { PALETTE } from "../../../../../../styles/common/constants/palette";
import { bpDown1024 } from "../../../../../../styles/common/mixins/breakpoints";
import { LAYOUT_SPACING } from "../../constants";

const PB = LAYOUT_SPACING.FILTERS_PADDING_BOTTOM; /* bottom padding */
const PT = LAYOUT_SPACING.FILTERS_PADDING_TOP; /* top padding */
const TITLE_HEIGHT = LAYOUT_SPACING.TITLE_HEIGHT; /* title height */

export const Layout = styled("div")<LayoutSpacing>`
  align-self: flex-start;
  background-color: ${PALETTE.BACKGROUND_DEFAULT};
  display: grid;
  gap: 12px;
  grid-column: 2;
  grid-row: 1;
  padding-bottom: ${PB}px;
  padding-top: ${({ top }) => top + TITLE_HEIGHT + PT}px;
  position: sticky;
  top: 0;
  z-index: 2; /* required, filters should be on top of entities */

  ${bpDown1024} {
    grid-column: 1;
    grid-row: auto;
    padding-top: ${PT}px;
    position: relative;
  }
`;
