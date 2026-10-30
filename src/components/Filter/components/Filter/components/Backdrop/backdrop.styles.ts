import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Backdrop } from "@mui/material";
import { SURFACE_TYPE } from "../../../surfaces/types";
import type { BackdropProps } from "./types";

export const StyledBackdrop = styled(Backdrop, {
  shouldForwardProp: (prop) => prop !== "surfaceType",
})<Pick<BackdropProps, "surfaceType">>`
  background-color: transparent;
  z-index: 1300;

  /* In the drawer, the backdrop stops the wheel; over the menu, the wheel passes through to the page. */
  ${({ surfaceType }) =>
    surfaceType === SURFACE_TYPE.DRAWER &&
    css`
      overflow: hidden;
      overscroll-behavior: none;
    `}
`;
