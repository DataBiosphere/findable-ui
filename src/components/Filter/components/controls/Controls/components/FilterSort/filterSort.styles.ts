import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  IconButton,
  Menu,
  MenuProps,
  menuClasses,
  paperClasses,
} from "@mui/material";
import { PALETTE } from "../../../../../../../styles/common/constants/palette";
import { MuiListItemButtonRoot } from "../../../../FilterList/filterList.styles";

export const StyledIconButton = styled(IconButton)<Pick<MenuProps, "open">>`
  align-self: center;
  padding: 0;

  ${({ open }) =>
    open &&
    css`
      color: ${PALETTE.INK_MAIN};
    `}
`;

export const StyledMenu = styled(Menu)`
  .${paperClasses.root} {
    margin: 4px 0;
    max-width: 300px;
    width: 100%;

    .${menuClasses.list} {
      ${MuiListItemButtonRoot}
    }
  }
`;
