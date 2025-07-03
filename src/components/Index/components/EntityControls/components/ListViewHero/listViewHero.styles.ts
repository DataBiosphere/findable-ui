import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { PALETTE } from "../../../../../../styles/common/constants/palette";

export const StyledGrid = styled(Grid)`
  align-items: center;
  gap: 16px;
  padding: 0 16px;
  position: relative; /* required; positions box-shadow */

  &:after {
    content: "";
    bottom: 0;
    box-shadow: inset 0 -1px 0 0 ${PALETTE.SMOKE_MAIN};
    height: 1px;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 2;
  }

  &:empty {
    display: none;
  }
`;
