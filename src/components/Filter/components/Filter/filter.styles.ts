import styled from "@emotion/styled";
import { Popover } from "@mui/material";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { mediaDownMedium } from "../../../../styles/common/mixins/breakpoints";
import { IconButton as DXIconButton } from "../../../common/IconButton/iconButton";

export const FilterPopover = styled(Popover)`
  .MuiPaper-menu {
    margin: 4px 0;
  }

  ${mediaDownMedium} {
    .MuiPaper-root {
      background-color: ${PALETTE.SMOKE_LIGHT};
      height: 100%;
      margin: 0;
      max-height: 100%;
      overflow: visible; // required; allows backdrop button to render outside of drawer container.
    }
  }
`;

export const IconButton = styled(DXIconButton)`
  color: ${PALETTE.COMMON_WHITE};
  left: calc(100% + 4px);
  position: absolute;
  top: 4px;
`;
