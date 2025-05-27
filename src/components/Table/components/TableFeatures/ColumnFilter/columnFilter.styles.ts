import styled from "@emotion/styled";
import { Menu, menuClasses, paperClasses } from "@mui/material";
import { MAX_LIST_HEIGHT_PX } from "../../../../Filter/common/constants";
import {
  MuiListItemButtonRoot,
  MuiListItemTextRoot,
} from "../../../../Filter/components/FilterList/filterList.styles";

export const StyledMenu = styled(Menu)`
  .${paperClasses.root} {
    margin: 4px 0;
    width: 288px;

    .${menuClasses.list} {
      max-height: ${MAX_LIST_HEIGHT_PX}px;
      overflow-wrap: break-word;

      ${MuiListItemButtonRoot}

      ${MuiListItemTextRoot}
    }
  }
`;
