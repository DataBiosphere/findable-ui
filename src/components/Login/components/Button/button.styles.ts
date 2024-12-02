import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const StyledButton = styled(Button)`
  &.MuiButton-root {
    justify-content: space-between;

    .MuiButton-endIcon {
      margin: -6px;
    }
  }
`;
