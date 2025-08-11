import styled from "@emotion/styled";
import { SvgIcon } from "@mui/material";
import { PALETTE } from "../../../../../../../../styles/common/constants/palette";

export const StyledSvgIcon = styled(SvgIcon)`
  &.MuiSvgIcon-root {
    border-radius: 50%;
    box-sizing: content-box;
    padding: 4px;

    &.Mui-completed {
      border: 2px solid ${PALETTE.SMOKE_DARK};
      color: ${PALETTE.INK_LIGHT};
    }
  }
`;
