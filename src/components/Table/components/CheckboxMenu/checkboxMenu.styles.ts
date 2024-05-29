import styled from "@emotion/styled";
import { Menu as MMenu } from "@mui/material";

export const Menu = styled(MMenu)`
  .MuiPaper-menu {
    margin: 4px 0;
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
