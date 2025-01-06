import styled from "@emotion/styled";
import { MenuItem } from "@mui/material";
import { DropdownMenu } from "../../../../../common/DropdownMenu/dropdownMenu";

export const StyledDropdownMenu = styled(DropdownMenu)`
  .MuiListItemButton-root {
    gap: 8px;

    &.Mui-disabled {
      opacity: 1;
    }
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  &:hover {
    background-color: transparent;

    .MuiListItemText-root {
      .MuiListItemText-primary {
        text-decoration: underline;
        text-decoration-skip-ink: none;
        text-underline-color: currentColor;
        text-underline-position: from-font;
      }
    }
  }
` as typeof MenuItem;
