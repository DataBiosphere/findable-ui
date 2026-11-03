import styled from "@emotion/styled";
import { Popper } from "@mui/material";
import { PALETTE } from "../../../../../../styles/common/constants/palette";
import { REFERENCE_HIDDEN_ATTRIBUTE } from "../../../../common/popper";

export const StyledPopper = styled(Popper)`
  /* Hidden while its input is out of view after a scroll, e.g. scrolled out of the sidebar or passed under the header; it shows again when the input returns. */
  &[${REFERENCE_HIDDEN_ATTRIBUTE}] {
    visibility: hidden;
  }

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
