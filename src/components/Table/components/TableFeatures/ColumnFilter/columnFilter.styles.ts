import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, listClasses, paperClasses, Popper } from "@mui/material";
import { PALETTE } from "../../../../../styles/common/constants/palette";
import { MAX_LIST_HEIGHT_PX } from "../../../../Filter/common/constants";
import { REFERENCE_HIDDEN_ATTRIBUTE } from "../../../../Filter/common/popper";
import {
  MuiListItemButtonRoot,
  MuiListItemTextRoot,
} from "../../../../Filter/components/FilterList/filterList.styles";
import { HEADER_HEIGHT_VAR } from "../../../../Layout/components/Header/common/constants";

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

export const StyledPopper = styled(Popper)`
  z-index: 1300;

  /* Hidden while its button is out of view after a scroll, e.g. passed under the header; it shows again when the button returns. */
  &[${REFERENCE_HIDDEN_ATTRIBUTE}] {
    visibility: hidden;
  }

  .${paperClasses.root} {
    overflow: hidden;
    overscroll-behavior: none; /* the wheel over the panel does not scroll the page */
    width: 288px;

    .${listClasses.root} {
      /* Fits the window below the header, less the panel's edge gaps and border, so its end is never cut off. */
      max-height: min(
        ${MAX_LIST_HEIGHT_PX}px,
        calc(100vh - ${HEADER_HEIGHT_VAR} - 24px)
      );
      overflow-wrap: break-word;
      overflow-y: auto;
      overscroll-behavior: none; /* the list is the scroller; at its end the wheel stops here */

      ${MuiListItemButtonRoot}

      ${MuiListItemTextRoot}
    }
  }
`;
