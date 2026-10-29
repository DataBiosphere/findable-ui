import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button as MButton } from "@mui/material";

interface Props {
  isEllipsis: boolean;
  maxLineCount: number;
}

export const Content = styled("div")<Props>`
  ${({ isEllipsis, maxLineCount }) =>
    isEllipsis &&
    css`
      -webkit-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: ${maxLineCount};
      overflow: hidden;
    `}
`;

export const Button = styled(MButton)`
  align-self: flex-start;
  margin-top: 8px;
`;
