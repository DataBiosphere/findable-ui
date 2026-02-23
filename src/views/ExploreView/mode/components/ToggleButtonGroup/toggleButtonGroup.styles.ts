import styled from "@emotion/styled";
import { ToggleButtonGroup } from "@mui/material";
import { PALETTE } from "../../../../../styles/common/constants/palette";

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  margin: 16px;

  .MuiToggleButton-root {
    padding: 6px 16px;
    text-transform: none;

    &.Mui-disabled {
      color: ${PALETTE.INK_LIGHT};
    }
  }
`;
