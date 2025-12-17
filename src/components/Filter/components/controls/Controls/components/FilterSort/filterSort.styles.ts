import styled from "@emotion/styled";
import { Menu, menuClasses, paperClasses } from "@mui/material";
import { MuiListItemButtonRoot } from "../../../../FilterList/filterList.styles";

export const StyledMenu = styled(Menu)`
  .${paperClasses.root} {
    margin: 4px 0;
    max-width: 300px;
    width: 100%;

    .${menuClasses.list} {
      ${MuiListItemButtonRoot}
    }
  }
`;
