import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FormControl, OutlinedInput } from "@mui/material";
import { PALETTE } from "../../../styles/common/constants/palette";

interface Props {
  isFilled: boolean;
}

// Input form control
export const InputFormControl = styled(FormControl)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InputField = styled(OutlinedInput, {
  shouldForwardProp: (prop) => prop !== "isFilled",
})<Props>`
  && ::placeholder {
    opacity: 0.8;
  }

  &&.Mui-focused ::placeholder {
    opacity: 0;
  }

  // Input filled.
  ${({ isFilled }) =>
    isFilled &&
    css`
      .MuiOutlinedInput-input,
      .MuiSvgIcon-root {
        color: ${PALETTE.INK_MAIN};
      }
    `};
`;
