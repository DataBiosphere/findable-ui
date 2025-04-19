import styled from "@emotion/styled";
import { Popover as MPopover } from "@mui/material";
import { PALETTE } from "../../../../../../styles/common/constants/palette";
import { mediaDesktopSmallDown } from "../../../../../../styles/common/mixins/breakpoints";
import { IconButton as DXIconButton } from "../../../../../common/IconButton/iconButton";

export const TemporarySidebar = styled(MPopover)`
  &.MuiPopover-root {
    ${mediaDesktopSmallDown} {
      & .MuiPaper-root {
        background-color: ${PALETTE.SMOKE_LIGHT};
        box-shadow: 0 1px 4px 0 transparent; // required; possible bug - box shadow "none" affects rendering of main content.
        height: 100%;
        max-height: 100%;
        overflow: visible; // required; allows backdrop button to render outside of drawer container.
        width: 312px;
      }
    }
  }
`;

export const IconButton = styled(DXIconButton)`
  color: ${PALETTE.COMMON_WHITE};
  left: calc(100% + 4px);
  position: absolute;
  top: 4px;
`;
