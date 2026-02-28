import styled from "@emotion/styled";
import { Box, ToggleButtonGroup } from "@mui/material";
import { bpDownMd } from "../../../../../../styles/common/mixins/breakpoints";
import { PALETTE } from "../../../../../../styles/common/constants/palette";

export const StyledBox = styled(Box)`
  margin-bottom: -16px;
  padding: 16px;

  ${bpDownMd} {
    margin-bottom: 0;
  }
`;

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  .MuiToggleButton-root {
    gap: 4px;
    padding: 6px 16px;
    text-transform: none;

    &.Mui-disabled {
      color: ${PALETTE.INK_LIGHT};
    }
  }
`;
