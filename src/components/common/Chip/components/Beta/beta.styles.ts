import styled from "@emotion/styled";
import { Chip } from "@mui/material";
import { PALETTE } from "../../../../../styles/common/constants/palette";
import { FONT } from "../../../../../styles/common/constants/font";

export const StyledChip = styled(Chip)`
  background-color: ${PALETTE.PRIMARY_LIGHTEST};
  border-radius: 4px;
  color: ${PALETTE.PRIMARY_MAIN};

  .MuiChip-label {
    font: ${FONT.BODY_SMALL_500};
    padding: 0 5px;
  }
`;
