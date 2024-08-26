import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { mediaDesktopSmallUp } from "../../../../styles/common/mixins/breakpoints";
import { inkLight, inkMain } from "../../../../styles/common/mixins/colors";
import {
  textBody500,
  textUppercase500,
} from "../../../../styles/common/mixins/fonts";

interface Props {
  disabled: boolean;
  height: number;
}

export const Filters = styled("div")<Props>`
  ${textBody500};
  color: ${inkMain};
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
  ${textUppercase500};
  color: ${inkLight};
  padding: 8px;
`;
