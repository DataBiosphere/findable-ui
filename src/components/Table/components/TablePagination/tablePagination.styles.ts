import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { PALETTE } from "../../../../styles/common/constants/palette";

export const StyledGrid = styled(Grid)`
  align-items: center;
  background-color: ${PALETTE.COMMON_WHITE};
  gap: 16px;
  justify-content: center;
  padding: 16px;
`;
