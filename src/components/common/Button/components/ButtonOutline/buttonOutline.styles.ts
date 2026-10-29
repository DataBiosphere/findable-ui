import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { COLOR_MIXES } from "../../../../../styles/common/constants/colorMixes";
import { PALETTE } from "../../../../../styles/common/constants/palette";

export const ButtonOutline = styled(Button)`
  box-shadow: inset 0 0 0 1px ${COLOR_MIXES.COMMON_WHITE_32};
  color: ${PALETTE.COMMON_WHITE};

  &:hover {
    box-shadow: inset 0 0 0 1px ${COLOR_MIXES.COMMON_WHITE_64};
  }

  &:disabled {
    box-shadow: inset 0 0 0 1px ${COLOR_MIXES.COMMON_WHITE_32};
    color: ${PALETTE.COMMON_WHITE};
  }
`;
