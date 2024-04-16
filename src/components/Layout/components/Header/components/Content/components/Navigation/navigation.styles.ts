import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  ElementAlignment,
  ELEMENT_ALIGNMENT,
} from "../../../../../../../../common/entities";
import { mediaDesktopSmallUp } from "../../../../../../../../styles/common/mixins/breakpoints";
import { textBody500 } from "../../../../../../../../styles/common/mixins/fonts";

interface Props {
  alignment: ElementAlignment;
}

export const Navigation = styled("div")<Props>`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 8px;
  justify-content: flex-start;

  // Left alignment.
  ${({ alignment }) =>
    alignment === ELEMENT_ALIGNMENT.LEFT &&
    css`
      margin-left: 24px;
    `};

  // Center alignment.
  ${({ alignment }) =>
    alignment === ELEMENT_ALIGNMENT.CENTER &&
    css`
      justify-content: center;
    `};

  // Right alignment.
  ${({ alignment }) =>
    alignment === ELEMENT_ALIGNMENT.RIGHT &&
    css`
      justify-content: flex-end;
    `};

  .MuiButton-nav {
    ${textBody500};
    padding: 6px 12px;

    .MuiButton-endIcon {
      margin-left: -6px;
      margin-right: -6px;
    }
  }

  .MuiDivider-root {
    margin: 8px 0;

    ${mediaDesktopSmallUp} {
      display: none;
    }
  }
`;
