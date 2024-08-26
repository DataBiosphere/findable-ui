import styled from "@emotion/styled";
import { Popover } from "@mui/material";
import { mediaDesktopSmallDown } from "../../../../styles/common/mixins/breakpoints";
import { smokeLight, white } from "../../../../styles/common/mixins/colors";
import { IconButton as DXIconButton } from "../../../common/IconButton/iconButton";

export const FilterPopover = styled(Popover)`
  .MuiPaper-menu {
    margin: 4px 0;
  }

  ${mediaDesktopSmallDown} {
    .MuiPaper-root {
      background-color: ${smokeLight};
      height: 100%;
      margin: 0;
      max-height: 100%;
      overflow: visible; // required; allows backdrop button to render outside of drawer container.
    }
  }
`;

export const IconButton = styled(DXIconButton)`
  color: ${white};
  left: calc(100% + 4px);
  position: absolute;
  top: 4px;
`;
