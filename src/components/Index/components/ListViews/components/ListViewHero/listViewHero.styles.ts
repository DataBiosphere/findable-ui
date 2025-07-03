import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { PALETTE } from "../../../../../../styles/common/constants/palette";

export const StyledGrid = styled(Grid)`
  align-items: center;
  box-shadow: inset 0 -1px 0 0 ${PALETTE.SMOKE_MAIN};
  gap: 16px 0;
  padding: 0 16px;

  &:empty {
    display: none;
  }
`;
