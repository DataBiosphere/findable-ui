import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FormControl } from "@mui/material";
import { PALETTE } from "../../../../../styles/common/constants/palette";

interface Props {
  isFilled: boolean;
}

export const InputFormControl = styled(FormControl, {
  shouldForwardProp: (prop) => prop !== "isFilled",
})<Props>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  // Input filled.
  ${({ isFilled }) =>
    isFilled &&
    css`
      & .MuiOutlinedInput-input,
      .MuiSvgIcon-root {
        color: ${PALETTE.INK_MAIN};
      }
    `};
`;
