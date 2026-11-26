import styled from "@emotion/styled";
import { Chip } from "@mui/material";
import { FONT } from "../../../styles/common/constants/font";
import { PALETTE } from "../../../styles/common/constants/palette";

export const StyledChip = styled(Chip)`
  background-color: ${PALETTE.SMOKE_MAIN};
  box-shadow: 0 0 0 2px ${PALETTE.COMMON_WHITE};
  color: ${PALETTE.INK_MAIN};
  font: ${FONT.BODY_SMALL_400};
  height: 24px;
  justify-self: flex-start;
  min-width: 0;

  .MuiChip-label {
    font: ${FONT.BODY_SMALL_400};
    padding-left: 8px;
    padding-right: 8px;
  }
`;
