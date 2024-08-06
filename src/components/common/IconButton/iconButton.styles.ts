import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { IconButton as MIconButton } from "@mui/material";
import { smokeLightest } from "../../../styles/common/mixins/colors";

interface Props {
  open: boolean;
}

export const Button = styled(MIconButton, {
  shouldForwardProp: (prop) => prop !== "open",
})<Props>`
  ${({ open, ...props }) =>
    open &&
    css`
      &.MuiIconButton-root {
        background-color: ${smokeLightest(props)};
      }
    `}
`;
