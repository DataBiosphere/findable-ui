import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import { PALETTE } from "../../../../../styles/common/constants/palette";

export const StyledPaper = styled(Paper)`
  align-self: stretch;
  border: 1px solid ${PALETTE.SMOKE_MAIN};
  border-radius: 8px;
  overflow: hidden;
`;
