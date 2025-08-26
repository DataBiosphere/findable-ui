import styled from "@emotion/styled";
import { Grid } from "@mui/material";

export const StyledGrid = styled(Grid)`
  display: grid;
  gap: 8px 16px;
  grid-auto-flow: column;
  grid-template-columns: 1fr auto;
  margin: 8px 0;
  padding: 0 16px;
`;
