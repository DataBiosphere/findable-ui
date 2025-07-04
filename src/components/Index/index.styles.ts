import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { mediaTabletDown } from "../../styles/common/mixins/breakpoints";
import { FluidPaper } from "../common/Paper/components/FluidPaper/fluidPaper";

interface Props {
  top: number;
}

export const StyledGrid = styled(Grid)<Props>`
  flex: 1;
  padding-top: ${({ top }) => top}px;
`;

export const StyledFluidPaper = styled(FluidPaper)`
  &.MuiPaper-root {
    margin: 16px;
    position: relative; /* required; positions table loading indicator */

  ${mediaTabletDown} {
    &.MuiPaper-root {
      margin: 16px 0;
    }
  }
`;
