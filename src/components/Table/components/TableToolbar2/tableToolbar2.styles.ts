import styled from "@emotion/styled";
import { Toolbar as MToolbar, Stack } from "@mui/material";
import { PALETTE } from "../../../../styles/common/constants/palette";

export const StyledToolbar = styled(MToolbar)`
  align-items: center;
  background-color: ${PALETTE.COMMON_WHITE};
  display: flex;
  padding: 16px;
`;

export const StyledStack = styled(Stack)`
  align-items: center;
  flex: 1;
  flex-direction: row;
  gap: 8px;
  justify-content: flex-end;
`;
