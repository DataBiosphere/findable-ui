import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Popper } from "@mui/material";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { REFERENCE_HIDDEN_ATTRIBUTE } from "../../common/popper";
import { SURFACE_TYPE } from "../surfaces/types";
import { FilterProps } from "./types";

export const StyledPopper = styled(Popper, {
  shouldForwardProp: (prop) => prop !== "surfaceType",
})<Pick<FilterProps, "surfaceType">>`
  z-index: 1300;

  .MuiPaper-root {
    overflow: hidden;
    overscroll-behavior: none;
  }

  /* Hidden while its label is clipped out of view after a page scroll, e.g. by the sidebar shrinking as the footer scrolls in; it shows again when the label returns. */
  &[${REFERENCE_HIDDEN_ATTRIBUTE}] {
    visibility: hidden;
  }

  ${({ surfaceType }) =>
    surfaceType === SURFACE_TYPE.DRAWER &&
    css`
      inset: 0 auto 0 0 !important; // required to override Popper's default positioning for correct placement within the drawer.
      transform: none !important; // required to override Popper's transform for correct positioning within the drawer.

      .MuiPaper-root {
        background-color: ${PALETTE.SMOKE_LIGHT};
        border: none;
        border-radius: 0;
        box-shadow: none;
        height: 100%;
        margin: 0;
        max-height: 100%;
      }
    `}
`;
