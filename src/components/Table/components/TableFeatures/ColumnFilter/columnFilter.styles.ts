import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, Menu, menuClasses, paperClasses } from "@mui/material";
import { PALETTE } from "../../../../../styles/common/constants/palette";
import { MAX_LIST_HEIGHT_PX } from "../../../../Filter/common/constants";
import {
  MuiListItemButtonRoot,
  MuiListItemTextRoot,
} from "../../../../Filter/components/FilterList/filterList.styles";

interface Props {
  open: boolean;
}

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "open",
})<Props>`
  &.MuiButtonGroup-grouped {
    gap: 0;

    .MuiButton-endIcon {
      margin-left: 0;
      margin-right: -8px;
    }

    ${({ open }) =>
      open &&
      css`
        background-color: ${PALETTE.SMOKE_LIGHT};
      `}
  }
`;

export const StyledMenu = styled(Menu)`
  /* Below the header: the page scrolls while the menu is open, and a menu following its button must pass under the header, not over it. */
  z-index: ${({ theme }) => theme.zIndex.appBar - 1};

  .${paperClasses.root} {
    margin: 4px 0;
    overscroll-behavior: none; /* the wheel over the menu does not scroll the page */
    width: 288px;

    .${menuClasses.list} {
      max-height: ${MAX_LIST_HEIGHT_PX}px;
      overflow-wrap: break-word;
      overscroll-behavior: none; /* the list is the scroller; at its end the wheel stops here */

      ${MuiListItemButtonRoot}

      ${MuiListItemTextRoot}
    }
  }
`;
