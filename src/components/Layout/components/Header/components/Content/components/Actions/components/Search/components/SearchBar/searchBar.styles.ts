import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import { PALETTE } from "../../../../../../../../../../../../styles/common/constants/palette";

export const StyledPaper = styled(Paper)`
  border-bottom: 1px solid ${PALETTE.SMOKE_MAIN};
  border-radius: 0;
  /* Deviates from the theme scale deliberately: shadows[1] (0 1px 4px 0) casts
     ~1px above the element, which would bleed over the header's bottom border.
     Offsetting by half the blur keeps the 3px below and removes the top. */
  box-shadow: 0 2px 4px -1px #00000012;
  left: 0;
  position: absolute;
  top: 100%;
  width: 100%;
  /* The menu's toolbar sits in a statically positioned AppBar, so it forms no
     stacking context and painting falls back to tree order — the nav buttons
     come later in the DOM and would cover the bar. */
  z-index: 1;
`;
