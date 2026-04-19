import styled from "@emotion/styled";
import { Drawer } from "@mui/material";
import { ComponentProps } from "react";
import { LayoutSpacing } from "../../../../../hooks/UseLayoutSpacing/types";
import { PALETTE } from "../../../../../styles/common/constants/palette";

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp(prop) {
    return prop !== "bottom" && prop !== "top";
  },
})<ComponentProps<typeof Drawer> & LayoutSpacing>`
  height: 100%;
  max-height: 100dvh;
  width: 412px;
  z-index: 0;

  > .MuiPaper-root {
    background-color: ${PALETTE.COMMON_WHITE};
    border-right: 1px solid ${PALETTE.SMOKE_MAIN};
    padding-top: ${({ top }) => top}px;
    position: relative;
    width: inherit;
  }
`;
