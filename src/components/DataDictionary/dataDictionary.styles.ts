import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { mediaTabletDown } from "../../styles/common/mixins/breakpoints";
import { LayoutMetrics } from "./hooks/UseLayoutMetrics/types";

const PT = 16;
const PB = 24;
const TITLE_ROW_HEIGHT = 74;

export const grid = css`
  column-gap: 24px;
  display: grid;
  grid-template-columns: 242px 1fr;
`;

export const View = styled("div")`
  ${grid};
  flex: 1;
  margin: 0 auto;
  max-width: min(calc(100vw - 48px), 1392px);
  position: relative;

  ${mediaTabletDown} {
    grid-template-columns: 1fr;
    max-width: calc(100vw - 32px);
  }
`;

export const TitleRow = styled("div")<LayoutMetrics>`
  grid-column: 1 / -1;
  grid-row: 1;
  height: fit-content;
  padding-top: ${({ top }) => top}px;
  position: sticky;
  top: 0;
`;

export const LeftColumn = styled("div")<LayoutMetrics>`
  grid-column: 1;
  grid-row: 1;
  margin-bottom: ${({ bottom }) =>
    -bottom}px; /* required; prevents sticky element from scrolling when footer scrolls into viewport */
  max-height: 100vh;
  overflow: hidden;
  padding-bottom: ${({ bottom }) => bottom}px;
  padding-top: ${({ top }) => top + TITLE_ROW_HEIGHT}px;
  position: sticky;
  top: 0;

  ${mediaTabletDown} {
    display: none;
  }
`;

export const RightColumn = styled("div")<LayoutMetrics>`
  grid-column: 2;
  grid-row: 1;
  padding: ${({ top }) => top + TITLE_ROW_HEIGHT + PT}px 0 ${PB}px;
  z-index: 1; /* not required, but helpful in that the right column is always on top */
`;

export const LeftColumnScroller = styled("div")`
  height: 100%;
  overflow: auto;
  padding: ${PT}px 0 ${PB}px;
`;
