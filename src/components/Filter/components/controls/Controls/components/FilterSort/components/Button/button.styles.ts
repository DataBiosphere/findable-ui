import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, MenuProps } from "@mui/material";
import { FONT } from "../../../../../../../../../styles/common/constants/font";
import { PALETTE } from "../../../../../../../../../styles/common/constants/palette";

export const StyledButton = styled(Button)<Pick<MenuProps, "open">>`
  align-items: center;
  font: ${FONT.BODY_SMALL_500};

  &:hover {
    text-decoration: none;
  }

  ${({ open }) =>
    open &&
    css`
      color: ${PALETTE.INK_MAIN};
    `}
`;
