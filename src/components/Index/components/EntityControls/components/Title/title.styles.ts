import styled from "@emotion/styled";
import { Grid } from "@mui/material";

export const StyledGrid = styled(Grid)`
  margin: 16px;

  &:empty {
    display: none;
  }
`;
