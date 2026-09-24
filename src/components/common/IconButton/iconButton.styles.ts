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
  ${({ open }) =>
    open &&
    css`
      &.MuiIconButton-root {
        background-color: ${PALETTE.SMOKE_LIGHTEST};
      }
    `}
`;
