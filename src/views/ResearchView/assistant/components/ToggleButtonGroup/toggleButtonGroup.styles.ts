import styled from "@emotion/styled";
import { Box, ToggleButtonGroup } from "@mui/material";
import { PALETTE } from "../../../../../styles/common/constants/palette";
import { FONT } from "../../../../../styles/common/constants/font";

export const StyledBox = styled(Box)`
  background-color: ${PALETTE.COMMON_WHITE};
  margin-bottom: -16px;
  padding: 16px;
  z-index: 1;
`;

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  .MuiToggleButton-root {
    gap: 4px;
    padding: 6px 16px;
    text-transform: none;

    &.Mui-disabled {
      color: ${PALETTE.INK_LIGHT};
    }

    .MuiChip-root {
      background-color: ${PALETTE.PRIMARY_LIGHTEST};
      border-radius: 4px;
      color: ${PALETTE.PRIMARY_MAIN};

      .MuiChip-label {
        font: ${FONT.BODY_SMALL_500};
        padding: 0 5px;
      }
    }
  }
`;
