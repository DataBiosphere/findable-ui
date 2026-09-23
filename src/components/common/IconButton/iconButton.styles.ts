import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { IconButton as MIconButton } from "@mui/material";
import { PALETTE } from "../../../styles/common/constants/palette";

interface Props {
  open: boolean;
}

export const Button = styled(MIconButton, {
  shouldForwardProp: (prop) => prop !== "open",
})<Props>`
  /* A control marked aria-disabled stays focusable by design, so MUI never adds
   * .Mui-disabled and never applies its pointer-events: none. Suppress the
   * pointer affordance here: without it the button keeps cursor: pointer and
   * still matches the theme's :hover / :active rules while ignoring every
   * click. Keyboard focus is untouched, so the state remains readable. */
  &[aria-disabled="true"] {
    pointer-events: none;
  }

  ${({ open }) =>
    open &&
    css`
      &.MuiIconButton-root {
        background-color: ${PALETTE.SMOKE_LIGHTEST};
      }
    `}
`;
