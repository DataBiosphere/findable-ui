import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Menu as MMenu, MenuItem as MMenuItem } from "@mui/material";
import {
  inkLight,
  smokeLight,
  smokeMain,
} from "../../../../../../../../../../styles/common/mixins/colors";
import { Button as DXButton } from "../../../../../../../../../common/Button/button";

interface Props {
  isActive: boolean;
}

export const Menu = styled(MMenu)`
  .MuiPaper-menu {
    border-color: ${smokeMain};
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
        white-space: normal;

        .MuiListItemText-primary {
          align-items: center;
          display: flex;
          gap: 4px;
          min-width: 0;
        }

        .MuiListItemText-secondary {
          color: ${inkLight};
          white-space: normal;
        }
      }

      &.Mui-disabled {
        color: ${inkLight};
        opacity: 1;
      }

      &.Mui-selected {
        background-color: ${smokeLight};
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

  .MuiPopover-root {
    cursor: default;
    z-index: -1;
  }
`;

export const Button = styled(DXButton, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<Props>`
  // Button is "active" i.e. menu is open.
  ${(props) =>
    props.isActive &&
    css`
      background-color: ${smokeLight(props)};
    `};
`;

export const StyledMenuItem = styled(MMenuItem)`
  padding: 0;
`;
