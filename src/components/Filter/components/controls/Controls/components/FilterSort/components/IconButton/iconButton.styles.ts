import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { IconButton, MenuProps } from "@mui/material";
import { PALETTE } from "../../../../../../../../../styles/common/constants/palette";

export const StyledIconButton = styled(IconButton)<Pick<MenuProps, "open">>`
  align-self: center;
  padding: 0;

  ${({ open }) =>
    open &&
    css`
      color: ${PALETTE.INK_MAIN};
    `}
`;
