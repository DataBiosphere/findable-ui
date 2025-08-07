import styled from "@emotion/styled";
import { CircularProgress as MCircularProgress } from "@mui/material";
import { PALETTE } from "../../../../../../../styles/common/constants/palette";
import {
  infoLight,
  smokeLight,
  successLight,
  warningLight,
} from "../../../../../../../styles/common/mixins/colors";

export const CircularProgress = styled(MCircularProgress)`
  color: ${smokeLight};
  left: 0;
  position: absolute;
  top: 0;
  z-index: 0;

  &.MuiCircularProgress-colorAlert {
    color: ${PALETTE.ALERT_LIGHT};
  }

  &.MuiCircularProgress-colorInfo {
    color: ${infoLight};
  }

  &.MuiCircularProgress-colorSuccess {
    color: ${successLight};
  }

  &.MuiCircularProgress-colorWarning {
    color: ${warningLight};
  }
`;
