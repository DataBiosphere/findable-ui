import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { PALETTE } from "../../styles/common/constants/palette";
import { bpDownMd, bpDownSm } from "../../styles/common/mixins/breakpoints";
import { FluidPaper } from "../common/Paper/components/FluidPaper/fluidPaper";
import { HEADER_HEIGHT_VAR } from "../Layout/components/Header/common/constants";

export const StyledGridEntityView = styled(Grid)`
  align-content: flex-start;
  display: grid;
  flex: 1;
  gap: 0;
  contain: size; /* fills the main row without growing it, so the page fits the window */
  height: 100%;
  overflow: hidden;

  /* Below md the footer is too tall to keep on screen: fill the window below the header and let the footer follow. */
  ${bpDownMd} {
    height: calc(100vh - ${HEADER_HEIGHT_VAR});
  }
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
