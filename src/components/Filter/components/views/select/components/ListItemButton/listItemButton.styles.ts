import styled from "@emotion/styled";
import { ListItemButton } from "@mui/material";
import { PALETTE } from "../../../../../../../styles/common/constants/palette";

export const StyledListItemButton = styled(ListItemButton)`
  gap: 8px;

  &.Mui-disabled {
    color: ${PALETTE.SMOKE_MAIN};
    opacity: 1;
  }
`;
