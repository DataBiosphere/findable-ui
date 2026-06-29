import styled from "@emotion/styled";
import { Grid } from "@mui/material";

export const StyledGrid = styled(Grid)`
  align-items: center;
  align-self: flex-start;
  display: flex;

  .MuiFormControlLabel-root {
    align-items: center;
    gap: 0;
    margin: 0;
  }

  .MuiCheckbox-root {
    margin: -13px -1px -13px -13px;
    padding: 13px;
  }

  .MuiTypography-body-400 {
    .MuiLink-root {
      color: inherit;
    }
  }
`;
