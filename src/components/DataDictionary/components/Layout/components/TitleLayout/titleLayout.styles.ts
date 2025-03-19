import styled from "@emotion/styled";
import { LayoutSpacing } from "../../../../hooks/UseLayoutSpacing/types";

export const Layout = styled("div")<LayoutSpacing>`
  grid-column: 1 / -1;
  grid-row: 1;
  height: fit-content;
  padding-top: ${({ top }) => top}px;
  position: sticky;
  top: 0;
`;
