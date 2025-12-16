import styled from "@emotion/styled";
import { OutlinedInput, Stack } from "@mui/material";
import { PALETTE } from "../../../../../../styles/common/constants/palette";

export const StyledStack = styled(Stack)`
  gap: 8px;
  grid-column: 1 / -1;
`;

export const StyledOutlinedInput = styled(OutlinedInput)`
  &:not(:placeholder-shown) {
    .MuiOutlinedInput-input {
      color: ${PALETTE.INK_MAIN};
    }
  }
`;
