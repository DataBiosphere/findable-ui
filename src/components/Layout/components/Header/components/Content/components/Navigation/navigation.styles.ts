import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { textBody500 } from "../../../../../../../../styles/common/mixins/fonts";

interface Props {
  isMenuIn: boolean;
}

export const Navigation = styled("div")<Props>`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 8px;
  justify-content: flex-start;

  ${({ isMenuIn }) =>
    isMenuIn &&
    css`
      flex: unset;
      justify-content: inherit;
    `};

  .MuiButton-activeNav,
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

    ${({ isMenuIn }) =>
      isMenuIn &&
      css`
        display: none;
      `};
  }
`;
