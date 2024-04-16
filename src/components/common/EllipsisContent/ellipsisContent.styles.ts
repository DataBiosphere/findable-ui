import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ButtonTextPrimary } from "../Button/components/ButtonTextPrimary/buttonTextPrimary";

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

export const Button = styled(ButtonTextPrimary)`
  align-self: flex-start;
  margin-top: 8px;
`;
