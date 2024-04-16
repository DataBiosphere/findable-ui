import styled from "@emotion/styled";
import { AppBar as MAppBar } from "@mui/material";
import { HEADER_HEIGHT } from "./common/constants";

export const AppBar = styled(MAppBar)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.smoke.main};

  &.MuiPaper-elevation0 {
    border-bottom: 1px solid transparent;
  }

  .MuiToolbar-root {
    gap: 16px;
    height: ${HEADER_HEIGHT}px;
    min-height: unset;
  }
` as typeof MAppBar;

export const HeaderSmAppBar = styled(AppBar)`
  .MuiToolbar-root {
    gap: 8px;
  }
` as typeof MAppBar;
