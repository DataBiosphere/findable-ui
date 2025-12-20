import styled from "@emotion/styled";
import { FormControlLabel } from "@mui/material";
import { PALETTE } from "../../../../../../../styles/common/constants/palette";

export const StyledFormControlLabel = styled(FormControlLabel)`
  .MuiFormControlLabel-label {
    border-bottom: 1px dashed ${PALETTE.SMOKE_DARK};
    height: 20px;
  }
`;
