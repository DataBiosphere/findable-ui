import styled from "@emotion/styled";
import { Drawer } from "@mui/material";
import { PALETTE } from "../../../../../../styles/common/constants/palette";

export const StyledDrawer = styled(Drawer)`
  &.MuiDrawer-root {
    .MuiPaper-root {
      background-color: ${PALETTE.SMOKE_LIGHT};
      max-height: 100vh;
      padding: 16px 0;
      width: 312px;
    }

    + .MuiDrawer-root {
      .MuiBackdrop-root {
        background-color: transparent;
      }
    }
  }
`;
