import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, ButtonProps } from "@mui/material";
import { PALETTE } from "../../../../../styles/common/constants/palette";

interface Props extends ButtonProps {
  open?: boolean;
}

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "open",
})<Props>`
  gap: 0;

  .MuiButton-endIcon {
    margin-left: -2px;
    margin-right: -8px;
  }

  ${({ open }) =>
    open &&
    css`
      background-color: ${PALETTE.SMOKE_LIGHTEST};
    `}
`;
