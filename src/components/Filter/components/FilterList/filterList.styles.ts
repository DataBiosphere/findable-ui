import styled from "@emotion/styled";
import { List as MList } from "@mui/material";
import { LIST_MARGIN } from "../../common/constants";

export const List = styled(MList)`
  && {
    overflow-wrap: break-word;
    margin: ${LIST_MARGIN}px 0;
    padding: 0;
  }

  // List subheading
  .MuiListSubheader-root {
    padding: 8px 16px;
  }

  // Group divider
  .MuiDivider-root {
    margin: 8px 0;
  }

  // List item
  .MuiListItemButton-root {
    gap: 8px;
    padding: 10px 16px;
  }

  // List item text
  .MuiListItemText-root {
    align-items: center;
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr auto;

    > span {
      min-width: 0; /* required; flexbox child min-width property is "auto" by default making overflow-wrap ineffectual */
    }
  }
`;
