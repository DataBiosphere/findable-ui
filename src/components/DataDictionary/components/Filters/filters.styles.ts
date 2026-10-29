import styled from "@emotion/styled";
import { Grid } from "@mui/material";

export const StyledGrid = styled(Grid)`
  align-items: center;
  display: grid;
  gap: 16px;
  grid-auto-flow: column;
  grid-template-columns: 1fr; /* search fills the row; column filters and download take their own width */
`;
