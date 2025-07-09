import styled from "@emotion/styled";
import { Toolbar as MToolbar } from "@mui/material";
import { PALETTE } from "../../../../styles/common/constants/palette";

export const StyledToolbar = styled(MToolbar)`
  align-items: center;
  background-color: ${PALETTE.COMMON_WHITE};
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  padding: 16px;

  .MuiGrid-root {
    &:empty {
      display: none;
    }
  }
`;
