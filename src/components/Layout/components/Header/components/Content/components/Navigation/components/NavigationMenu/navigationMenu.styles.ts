import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Menu as MMenu } from "@mui/material";
import { Button as DXButton } from "../../../../../../../../../common/Button/button";

interface Props {
  isActive: boolean;
}

export const Menu = styled(MMenu)`
  .MuiPaper-menu {
    border-color: ${({ theme }) => theme.palette.smoke.main};
    margin: 4px 0;
    max-width: 324px;
    min-width: 204px;
  }

  .MuiList-root {
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

        .MuiListItemText-primary {
          align-items: center;
          display: flex;
          gap: 4px;
        }

        .MuiListItemText-secondary {
          color: ${({ theme }) => theme.palette.ink.light};
          white-space: normal;
        }
      }
    }

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
`;

export const Button = styled(DXButton, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<Props>`
  // Button is "active" i.e. menu is open.
  ${({ isActive, theme }) =>
    isActive &&
    css`
      background-color: ${theme.palette.smoke.light};
    `};
`;
