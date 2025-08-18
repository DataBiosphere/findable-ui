import styled from "@emotion/styled";
import { Popper } from "@mui/material";
import { PALETTE } from "../../../../../../styles/common/constants/palette";

export const StyledPopper = styled(Popper)`
  .MuiPaper-root {
    width: 368px;
  }
`;

export const StyledPopperDrawer = styled(Popper)`
  .MuiPaper-root {
    background-color: ${PALETTE.SMOKE_LIGHT};
    width: 312px;

    .MuiList-root {
      margin: 0;
    }
  }
`;
