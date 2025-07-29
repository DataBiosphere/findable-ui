import styled from "@emotion/styled";
import { ListItemText } from "@mui/material";

export const StyledListItemText = styled(ListItemText)`
  align-items: center;
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr auto;

  > span {
    min-width: 0; /* required; flexbox child min-width property is "auto" by default making overflow-wrap ineffectual */
  }
`;
