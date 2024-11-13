import styled from "@emotion/styled";
import { Fab as MFab, Popover as MPopover } from "@mui/material";
import { mediaTabletUp } from "../../../../../../styles/common/mixins/breakpoints";
import { smokeMain } from "../../../../../../styles/common/mixins/colors";
import { shadows02 } from "../../../../../../styles/common/mixins/shadows";
import { tabletUp } from "../../../../../../theme/common/breakpoints";
import { alpha80, inkMain } from "../../../../../../theme/common/palette";

interface Props {
  open: boolean;
}

export const Fab = styled(MFab)<Props>`
  bottom: 16px;
  box-shadow: ${shadows02};
  position: fixed;
  right: 16px;
  z-index: ${({ open }) => (open ? 1350 : 1050)}; // Above backdrop component.

  ${mediaTabletUp} {
    bottom: 72px;
  }
`;

export const Popover = styled(MPopover)`
  &.MuiPopover-root {
    background-color: ${inkMain}${alpha80};

    > .MuiPaper-root {
      border: 1px solid ${smokeMain};
      border-radius: 8px;
      width: 100%;

      ${tabletUp} {
        max-width: 496px;
      }
    }
  }
`;
