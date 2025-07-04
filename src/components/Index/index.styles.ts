import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { LayoutSpacing } from "../../hooks/UseLayoutSpacing/types";
import { PALETTE } from "../../styles/common/constants/palette";
import { mediaTabletDown } from "../../styles/common/mixins/breakpoints";
import { FluidPaper } from "../common/Paper/components/FluidPaper/fluidPaper";

export const StyledGrid = styled(Grid)<LayoutSpacing>`
  align-content: flex-start;
  display: grid;
  flex: 1;
  gap: 0;
  height: 100%;
  max-height: 100vh;
  overflow: hidden;
  padding-top: ${({ top }) => top}px;
`;

export const StyledFluidPaper = styled(FluidPaper)`
  background-color: ${PALETTE.SMOKE_MAIN};
  display: grid;
  gap: 1px;
  margin: 16px;
  overflow: hidden;
  position: relative; /* required; positions table loading indicator */

  ${mediaTabletDown} {
    margin: 16px 0;
  }
`;
