import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FONT } from "../../../../styles/common/constants/font";
import { mediaDesktopSmallUp } from "../../../../styles/common/mixins/breakpoints";
import { inkLight, inkMain } from "../../../../styles/common/mixins/colors";

interface Props {
  disabled: boolean;
  height: number;
}

export const Filters = styled("div")<Props>`
  color: ${inkMain};
  font: ${FONT.BODY_500};
  height: ${({ height }) => height}px;
  margin: 8px 0;
  overflow: auto;
  padding: 0 8px 8px;

  // Filters are globally "disabled".
  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `};

  .MuiDivider-root {
    margin: 8px;
  }

  ${mediaDesktopSmallUp} {
    height: unset;
    overflow: unset;
    padding: 0 8px;
  }
`;

export const CategoryViewsLabel = styled("div")`
  color: ${inkLight};
  font: ${FONT.UPPERCASE_500};
  padding: 8px;
  text-transform: uppercase;
`;
