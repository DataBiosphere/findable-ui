import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { LayoutSpacing } from "../../hooks/UseLayoutSpacing/types";
import { PALETTE } from "../../styles/common/constants/palette";
import { bpDownSm } from "../../styles/common/mixins/breakpoints";
import { FluidPaper } from "../common/Paper/components/FluidPaper/fluidPaper";

export const StyledGridEntityView = styled(Grid, {
  shouldForwardProp: (prop) =>
    prop !== "bottom" && prop !== "entityLayoutHeight" && prop !== "top",
})<LayoutSpacing & { entityLayoutHeight: number }>`
  --entity-view-top: ${({ top }) => top}px;
  --entity-layout-gap: 16px;
  --table-head-top: calc(
    var(--entity-view-top) +
      ${({ entityLayoutHeight }) => entityLayoutHeight}px +
      var(--entity-layout-gap)
  );
  align-content: flex-start;
  display: grid;
  flex: 1;
  gap: 0;
  padding-top: var(--entity-view-top);
`;

export const StyledGridEntityLayout = styled(Grid)`
  align-items: center;
  background-color: ${PALETTE.BACKGROUND_DEFAULT};
  gap: 16px;
  min-height: 56px;
  padding: 0 16px;
  position: sticky;
  top: var(--entity-view-top);
  z-index: 3;

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
  isolation: isolate; /* keeps the loading indicator's z-index 10 under the sticky layout */
  min-width: 0; /* clip, unlike hidden, keeps the grid item's auto min-width */
  overflow: clip; /* not hidden: a scroll container would stop the sticky head */
  position: relative; /* required; positions table loading indicator */
`;

export const StyledStickyGap = styled.div`
  position: sticky;
  top: var(--table-head-top);
  z-index: 3;

  &::before {
    background-color: ${PALETTE.BACKGROUND_DEFAULT};
    bottom: 0;
    content: "";
    height: var(--entity-layout-gap);
    left: 0;
    position: absolute;
    right: 0;
  }

  &::after {
    border: 1px solid ${PALETTE.SMOKE_MAIN};
    border-bottom: none;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 0 0 8px ${PALETTE.BACKGROUND_DEFAULT};
    clip-path: inset(0 -8px);
    content: "";
    height: 8px;
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
  }

  & + * {
    margin-top: calc(
      -1 * var(--entity-layout-gap)
    ); /* cancels the grid gap the sticky gap adds */
  }

  ${bpDownSm} {
    &::before,
    &::after {
      display: none;
    }
  }
`;

export const StyledGridEntityList = styled(Grid)`
  display: grid;
  gap: var(--entity-layout-gap);
  margin: var(--entity-layout-gap);

  ${bpDownSm} {
    margin: var(--entity-layout-gap) 0;
  }
`;
