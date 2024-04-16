import styled from "@emotion/styled";
import { Menu } from "@mui/material";

export const CheckboxMenu = styled(Menu)`
  .MuiPaper-menu {
    margin: 8px 0;
  }

  // List item button
  .MuiListItemButton-root {
    gap: 8px;
  }

  // List item
  .MuiListItem-root {
    padding: 10px 16px;
  }

  .MuiListItemButton-root.Mui-disabled {
    opacity: 1;
  }
`;
