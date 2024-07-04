import styled from "@emotion/styled";

export const TooltipContent = styled.span`
  overflow: scroll;
  overscroll-behavior: none;
  padding: 8px 12px;

  &::-webkit-scrollbar {
    display: none;
  }
`;
