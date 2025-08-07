import styled from "@emotion/styled";
import { Fab as MFab, Popover as MPopover } from "@mui/material";
import { COLOR_MIXES } from "../../../../../../styles/common/constants/colorMixes";
import { PALETTE } from "../../../../../../styles/common/constants/palette";
import { SHADOWS } from "../../../../../../styles/common/constants/shadows";
import { bpUpSm } from "../../../../../../styles/common/mixins/breakpoints";

interface Props {
  open: boolean;
}

export const Fab = styled(MFab)<Props>`
  bottom: 16px;
  box-shadow: ${SHADOWS["02"]};
  position: fixed;
  right: 16px;
  z-index: ${({ open }) => (open ? 1350 : 1050)}; // Above backdrop component.

  ${bpUpSm} {
    bottom: 72px;
  }
`;

export const Popover = styled(MPopover)`
  &.MuiPopover-root {
    background-color: ${COLOR_MIXES.INK_MAIN_80};

    > .MuiPaper-root {
      border: 1px solid ${PALETTE.SMOKE_MAIN};
      border-radius: 8px;
      width: 100%;

      ${bpUpSm} {
        max-width: 496px;
      }
    }
  }
`;
