import styled from "@emotion/styled";
import { Popover } from "@mui/material";
import { mediaDesktopSmallDown } from "../../../../styles/common/mixins/breakpoints";
import { smokeLight } from "../../../../styles/common/mixins/colors";

export const FilterPopover = styled(Popover)`
  .MuiPaper-menu {
    margin: 0;
  }

  ${mediaDesktopSmallDown} {
    .MuiPaper-root {
      background-color: ${smokeLight};
      height: 100%;
      max-height: 100%;
      overflow: visible; // required; allows backdrop button to render outside of drawer container.
    }
  }
`;
