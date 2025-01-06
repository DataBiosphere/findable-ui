import styled from "@emotion/styled";
import { MenuItem } from "@mui/material";

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
