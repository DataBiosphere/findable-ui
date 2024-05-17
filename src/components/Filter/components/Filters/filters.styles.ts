import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { mediaDesktopSmallUp } from "../../../../styles/common/mixins/breakpoints";
import { inkLight, inkMain } from "../../../../styles/common/mixins/colors";
import {
  textBody400,
  textBody500,
} from "../../../../styles/common/mixins/fonts";

interface Props {
  disabled: boolean;
  height: number;
  isBaseStyle: boolean;
}

export const Filters = styled("div", {
  shouldForwardProp: (prop) => prop !== "height",
})<Props>`
  ${(props) => (props.isBaseStyle ? textBody500(props) : textBody400(props))};
  color: ${(props) => (props.isBaseStyle ? inkMain(props) : inkLight(props))};
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

export const CategoryViewsLabel = styled("div")`
  ${textBody500};
  color: ${inkMain};
  padding: 8px 16px;

  ${mediaDesktopSmallUp} {
    padding: 8px 0;
  }
`;
