import styled from "@emotion/styled";
import { Chip } from "@mui/material";
import { PALETTE } from "../../../../../../styles/common/constants/palette";

export const StyledChip = styled(Chip)`
  border-radius: 4px;
  box-shadow: 0 0 0 2px ${PALETTE.COMMON_WHITE};
  height: auto;
  justify-self: flex-start;
  min-width: 0;

  .MuiChip-label {
    padding: 2px 8px;
    white-space: normal;
  }
`;
