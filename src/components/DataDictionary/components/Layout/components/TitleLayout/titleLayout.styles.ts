import styled from "@emotion/styled";
import { LayoutSpacing } from "../../../../../../hooks/UseLayoutSpacing/types";
import {
  bpDown1024,
  bpDownSm,
} from "../../../../../../styles/common/mixins/breakpoints";

export const Layout = styled("div")<LayoutSpacing>`
  grid-column: 1 / -1;
  grid-row: 1;
  height: fit-content;
  padding-top: ${({ top }) => top}px; /* header height */
  position: sticky;
  top: 0;
  z-index: 4;

  ${bpDown1024} {
    grid-column: 1;
    grid-row: auto;
    position: relative;
  }

  ${bpDownSm} {
    margin: 0 16px;
  }
`;
