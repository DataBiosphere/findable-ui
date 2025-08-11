import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { MenuItem as MMenuItem, Popper as MPopper } from "@mui/material";
import { PALETTE } from "../../../../../../../../../../styles/common/constants/palette";
import { Button as DXButton } from "../../../../../../../../../common/Button/button";

interface Props {
  isActive: boolean;
}

export const StyledPopper = styled(MPopper)`
  z-index: 1300;

  .MuiPaper-menu {
    border-color: ${PALETTE.SMOKE_MAIN};
    margin: 4px 0;
    max-height: calc(100vh - 96px);
    max-width: 324px;
    min-width: 204px;
    overflow-y: auto;

    .MuiList-root {
      display: flex;
      flex-direction: column;

      .MuiMenuItem-root {
        gap: 8px;
        margin: 0;

        .MuiListItemIcon-root {
          align-self: flex-start;
          min-width: unset;
        }

        .MuiListItemText-root {
          display: grid;
          gap: 4px;
          white-space: normal;

          .MuiListItemText-primary {
            align-items: center;
            display: flex;
            gap: 4px;
            min-width: 0;
          }

          .MuiListItemText-secondary {
            color: ${PALETTE.INK_LIGHT};
            white-space: normal;
          }
        }

        &.Mui-disabled {
          color: ${PALETTE.INK_LIGHT};
          opacity: 1;
        }

        &.Mui-selected {
          background-color: ${PALETTE.SMOKE_LIGHT};
        }
      }

      .MuiButton-activeNav,
      .MuiButton-nav {
        font-weight: 400;
        justify-content: space-between;
        width: 100%;

        .MuiButton-endIcon {
          margin-left: -6px;
          margin-right: -6px;
        }
      }

      .MuiDivider-root {
        margin: 8px 0;
      }
    }
  }
`;

export const Button = styled(DXButton, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<Props>`
  // Button is "active" i.e. menu is open.
  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${PALETTE.SMOKE_LIGHT};
    `};
`;

export const StyledMenuItem = styled(MMenuItem)`
  padding: 0;
`;
