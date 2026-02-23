import styled from "@emotion/styled";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { MODE } from "../../../../views/ExploreView/mode/types";
import { css } from "@emotion/react";

export const Sidebar = styled("div", {
  shouldForwardProp: (prop) => prop !== "mode",
})<{ mode: MODE }>`
  align-self: stretch;
  border-right: 1px solid ${PALETTE.SMOKE_MAIN};
  box-sizing: content-box;
  width: 264px;

  ${({ mode }) =>
    mode === MODE.RESEARCH &&
    css`
      width: 412px;
    `}
`;
