import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface MatchHighlightProps {
  leftOpen: boolean;
  rightOpen: boolean;
}

export const MatchHighlight = styled.mark<MatchHighlightProps>`
  background: ${({ theme }) => theme.palette.warning.light};
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
