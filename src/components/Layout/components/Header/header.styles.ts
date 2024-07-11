import { css } from "@emotion/react";
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

const group = css`
  align-items: center;
  display: flex;
  flex: 1;
`;

export const Left = styled.div`
  ${group};
  gap: 16px;
  justify-content: flex-start;

  .MuiButton-navPrimary {
    &:first-of-type {
      margin-left: 24px;
    }
  }
`;

export const Center = styled.div`
  ${group};
  justify-content: center;
`;

export const Right = styled.div`
  ${group};
  justify-content: flex-end;
`;
