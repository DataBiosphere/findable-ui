import styled from "@emotion/styled";
import { RoundedPaper } from "../../../../../components/common/Paper/components/RoundedPaper/roundedPaper";
import { Box } from "@mui/material";

export const StyledBox = styled(Box)`
  padding: 16px;
`;

export const StyledPaper = styled(RoundedPaper)`
  display: flex;
  flex-direction: column;

  .MuiInputBase-root {
    padding: 16px;
  }

  .MuiStack-root {
    justify-content: flex-end;
    padding: 8px;
  }
`;
