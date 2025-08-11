import styled from "@emotion/styled";
import { PALETTE } from "../../../../../../../../styles/common/constants/palette";
import { mediaTabletUp } from "../../../../../../../../styles/common/mixins/breakpoints";
import { DrawerTitle as DXDrawerTitle } from "../../../../../../../common/Drawer/components/DrawerTitle/drawerTitle";
import { Drawer as DXDrawer } from "../../../../../../../common/Drawer/drawer";

export const Drawer = styled(DXDrawer)`
  &.MuiDrawer-modal {
    pointer-events: none;

    .MuiDrawer-paper {
      border-left: 1px solid ${PALETTE.SMOKE_MAIN};
      box-shadow: -8px 0 8px -4px #10182808, 0 20px 24px -4px #10182814;
      pointer-events: all;
      max-width: min(506px, 84vw);
      width: 100%;
    }

    ${mediaTabletUp} {
      .MuiDrawer-paper {
        max-width: min(506px, 50vw);
      }
    }
  }
`;

export const DrawerTitle = styled(DXDrawerTitle)`
  .MuiTypography-heading-small {
    font-size: 20px;
  }
`;
