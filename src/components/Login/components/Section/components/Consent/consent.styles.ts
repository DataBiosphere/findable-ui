import styled from "@emotion/styled";
import { Grid } from "@mui/material";

export const StyledGrid = styled(Grid)`
  align-items: center;
  align-self: flex-start;
  display: flex;
  gap: 12px;

  .MuiTypography-body-400 {
    .MuiLink-root {
      color: inherit;
    }
  }
`;
