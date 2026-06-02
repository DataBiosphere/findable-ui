import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { LayoutSpacing } from "../../hooks/UseLayoutSpacing/types";
import { PALETTE } from "../../styles/common/constants/palette";
import { bpDownSm } from "../../styles/common/mixins/breakpoints";
import { FluidPaper } from "../common/Paper/components/FluidPaper/fluidPaper";

export const StyledGridEntityView = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "bottom" && prop !== "top",
})<LayoutSpacing>`
  align-content: flex-start;
  display: grid;
  flex: 1;
  gap: 0;
  height: 100%;
  max-height: 100vh;
  overflow: hidden;
  padding-top: ${({ top }) => top}px;
`;

export const StyledGridEntityLayout = styled(Grid)`
  align-items: center;
  gap: 16px;
  min-height: 56px;
  padding: 0 16px;
  position: relative; /* required; positions box-shadow */

  &:after {
    content: "";
    bottom: 0;
    box-shadow: inset 0 -1px 0 0 ${PALETTE.SMOKE_MAIN};
    height: 1px;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 2;
  }

  &:empty {
    display: none;
  }

  .MuiGrid-root {
    align-items: center;

    &:empty {
      display: none;
    }
  }
`;

export const StyledFluidPaper = styled(FluidPaper)`
  background-color: ${PALETTE.SMOKE_MAIN};
  display: grid;
  gap: 1px;
  overflow: hidden;
  position: relative; /* required; positions table loading indicator */
`;

export const StyledGridEntityList = styled(Grid)`
  display: grid;
  gap: 16px;
  margin: 16px;
  overflow: hidden;

  ${bpDownSm} {
    margin: 16px 0;
  }
`;
