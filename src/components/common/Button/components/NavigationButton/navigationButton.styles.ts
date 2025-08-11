import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { PALETTE } from "../../../../../styles/common/constants/palette";
import { Button as DXButton } from "../../button";

interface Props {
  isActive: boolean;
}

export const Button = styled(DXButton, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<Props>`
  background-color: ${PALETTE.COMMON_WHITE};
  color: inherit;
  padding: 6px 6px 6px 12px;

  &:active,
  &:hover {
    background-color: ${PALETTE.SMOKE_LIGHT};
  }

  // Button is "active" i.e. menu is open.
  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${PALETTE.SMOKE_LIGHT};
    `};

  .MuiButton-endIcon {
    margin-left: -6px;
  }
`;
