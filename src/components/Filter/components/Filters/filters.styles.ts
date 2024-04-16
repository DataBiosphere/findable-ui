import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { mediaDesktopSmallUp } from "../../../../styles/common/mixins/breakpoints";

interface Props {
  disabled: boolean;
  height: number;
}

export const Filters = styled("div", {
  shouldForwardProp: (prop) => prop !== "height",
})<Props>`
  height: ${({ height }) => height}px;
  margin: 8px 0;
  overflow: auto;
  padding: 0 0 8px;

  // Filters are globally "disabled".
  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `};

  .MuiDivider-root {
    margin: 8px 0;
  }

  ${mediaDesktopSmallUp} {
    height: unset;
    overflow: unset;
    padding: 0 12px 0 16px;
  }
`;
