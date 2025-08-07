import styled from "@emotion/styled";
import { CircularProgress as MCircularProgress } from "@mui/material";
import { PALETTE } from "../../../../../../../styles/common/constants/palette";
import {
  successLight,
  warningLight,
} from "../../../../../../../styles/common/mixins/colors";

export const CircularProgress = styled(MCircularProgress)`
  color: ${PALETTE.SMOKE_LIGHT};
  left: 0;
  position: absolute;
  top: 0;
  z-index: 0;

  &.MuiCircularProgress-colorAlert {
    color: ${PALETTE.ALERT_LIGHT};
  }

  &.MuiCircularProgress-colorInfo {
    color: ${PALETTE.INFO_LIGHT};
  }

  &.MuiCircularProgress-colorSuccess {
    color: ${successLight};
  }

  &.MuiCircularProgress-colorWarning {
    color: ${warningLight};
  }
`;
