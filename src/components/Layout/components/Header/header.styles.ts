import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { AppBar as MAppBar } from "@mui/material";
import { smokeMain } from "../../../../styles/common/mixins/colors";
import { HEADER_HEIGHT } from "./common/constants";

export const AppBar = styled(MAppBar)`
  border-bottom: 1px solid ${smokeMain};

  &.MuiPaper-elevation0 {
    border-bottom: 1px solid transparent;
  }

  .MuiToolbar-root {
    display: grid;
    gap: 16px;
    grid-template-areas: "left center right";
    grid-template-columns: 1fr auto 1fr;
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
  grid-area: left;
  justify-content: flex-start;

  .MuiButton-navPrimary {
    &:first-child {
      margin-left: 24px;
    }
  }
`;

export const Center = styled.div`
  ${group};
  grid-area: center;
  justify-content: center;
`;

export const Right = styled.div`
  ${group};
  gap: 8px;
  grid-area: right;
  justify-content: flex-end;
`;
