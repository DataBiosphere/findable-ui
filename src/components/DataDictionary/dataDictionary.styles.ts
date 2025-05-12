import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { mediaTabletDown } from "../../styles/common/mixins/breakpoints";

export const grid = css`
  column-gap: 24px;
  display: grid;
  grid-template-columns: 242px 1fr;
`;

export const View = styled("div")`
  ${grid};
  flex: 1;
  margin: 0 24px;
  position: relative;

  ${mediaTabletDown} {
    grid-template-columns: 1fr;
    margin: 0 16px;
  }
`;
