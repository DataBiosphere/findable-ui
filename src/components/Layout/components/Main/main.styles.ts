import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface Props {
  offset: number;
}

const main = css`
  align-items: flex-start;
  display: flex;
  flex: 1;
`;

export const Main = styled("main")`
  ${main};
`;

export const MainWithOffset = styled(Main)<Props>`
  margin-top: ${({ offset }) => offset}px;
`;
