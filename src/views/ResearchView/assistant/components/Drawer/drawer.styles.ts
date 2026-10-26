import styled from "@emotion/styled";
import { Drawer } from "@mui/material";
import { HEADER_HEIGHT_VAR } from "../../../../../components/Layout/components/Header/common/constants";
import { PALETTE } from "../../../../../styles/common/constants/palette";

export const StyledDrawer = styled(Drawer)`
  contain: size; /* fills the main row without growing it, so a long conversation scrolls inside */
  height: 100%;
  max-height: calc(
    100dvh - ${HEADER_HEIGHT_VAR}
  ); /* never taller than the window, even beside content that grows the row */
  width: 412px;
  z-index: 0;

  > .MuiPaper-root {
    background-color: ${PALETTE.COMMON_WHITE};
    border-right: 1px solid ${PALETTE.SMOKE_MAIN};
    position: relative;
    width: inherit;
  }
`;
