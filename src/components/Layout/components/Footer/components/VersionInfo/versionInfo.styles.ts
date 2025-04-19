import styled from "@emotion/styled";
import { Chip } from "@mui/material";
import { PALETTE } from "../../../../../../styles/common/constants/palette";

export const StyledChip = styled(Chip)`
  align-self: center;
  border-radius: 4px;
  .MuiChip-label {
    color: ${PALETTE.INK_LIGHT};
  }
`;
