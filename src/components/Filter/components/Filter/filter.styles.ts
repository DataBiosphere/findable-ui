import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Popover } from "@mui/material";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { SURFACE_TYPE } from "../surfaces/types";
import { FilterProps } from "./filter";

export const StyledPopover = styled(Popover, {
  shouldForwardProp: (prop) => prop !== "surfaceType",
})<Pick<FilterProps, "surfaceType">>`
  .MuiPaper-menu {
    margin: 4px 0;
  }

  ${({ surfaceType }) =>
    surfaceType === SURFACE_TYPE.DRAWER &&
    css`
      .MuiPaper-root {
        background-color: ${PALETTE.SMOKE_LIGHT};
        height: 100%;
        margin: 0;
        max-height: 100%;
        overflow: visible; // required; allows backdrop button to render outside of drawer container.
      }
    `}
`;
