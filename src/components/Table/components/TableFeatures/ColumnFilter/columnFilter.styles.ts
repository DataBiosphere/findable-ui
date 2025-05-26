import styled from "@emotion/styled";
import { Menu, menuClasses, paperClasses } from "@mui/material";
import {
  MuiListItemButtonRoot,
  MuiListItemTextRoot,
} from "../../../../Filter/components/FilterList/filterList.styles";

export const StyledMenu = styled(Menu)`
  .${paperClasses.root} {
    margin: 4px 0;

    .${menuClasses.list} {
      width: 288px;

      ${MuiListItemButtonRoot}

      ${MuiListItemTextRoot}
    }
  }
`;
