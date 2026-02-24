import { Stack } from "@mui/material";
import styled from "@emotion/styled";
import { PALETTE } from "../../../../../../styles/common/constants/palette";

export const StyledStack = styled(Stack)`
  align-items: flex-start;
  padding: 0 16px;

  .MuiChip-root {
    background-color: ${PALETTE.COMMON_WHITE};
    border-color: ${PALETTE.SMOKE_MAIN};
    color: ${PALETTE.INK_MAIN};
    height: unset;
    padding: 8px 12px;

    &.MuiChip-clickable:hover {
      background-color: transparent;
    }

    &:active {
      box-shadow: none;
    }

    .MuiChip-label {
      padding: 0;
    }
  }
`;
