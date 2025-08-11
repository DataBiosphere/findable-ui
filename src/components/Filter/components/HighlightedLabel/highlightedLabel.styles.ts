import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { PALETTE } from "../../../../styles/common/constants/palette";

interface MatchHighlightProps {
  leftOpen: boolean;
  rightOpen: boolean;
}

export const MatchHighlight = styled.mark<MatchHighlightProps>`
  background: ${PALETTE.WARNING_LIGHT};
  color: inherit;
  padding: 2px 0;

  ${({ leftOpen }) =>
    leftOpen &&
    css`
      margin-left: -2px;
      padding-left: 2px;
    `}

  ${({ rightOpen }) =>
    rightOpen &&
    css`
      margin-right: -2px;
      padding-right: 2px;
    `}
`;
