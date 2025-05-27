import styled from "@emotion/styled";
import { mediaTabletDown } from "../../../../../../styles/common/mixins/breakpoints";
import { LayoutSpacing } from "../../../../hooks/UseLayoutSpacing/types";

export const Layout = styled("div")<LayoutSpacing>`
  grid-column: 1 / -1;
  grid-row: 1;
  height: fit-content;
  padding-top: ${({ top }) => top}px; /* header height */
  position: sticky;
  top: 0;
  z-index: 4;

  ${mediaTabletDown} {
    grid-column: 1;
    grid-row: auto;
    position: relative;
  }
`;
