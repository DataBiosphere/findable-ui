import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { textBody500 } from "../../../../../../../../styles/common/mixins/fonts";

interface Props {
  isMenuIn: boolean;
}

export const Navigation = styled("div")<Props>`
  display: flex;
  flex: unset;
  flex-direction: row;
  gap: 8px;
  justify-content: inherit;

  ${({ isMenuIn }) =>
    isMenuIn &&
    css`
      flex: 1;
      justify-content: flex-start;
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
  }
`;
