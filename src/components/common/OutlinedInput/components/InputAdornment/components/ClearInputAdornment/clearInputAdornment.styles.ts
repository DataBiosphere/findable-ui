import styled from "@emotion/styled";
import { InputAdornment } from "@mui/material";
import { PALETTE } from "../../../../../../../styles/common/constants/palette";

export const StyledInputAdornment = styled(InputAdornment)`
  color: ${PALETTE.INK_LIGHT};
  margin: 0;

  .MuiIconButton-root {
    margin-right: -10px;
  }
`;
