import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { OutlinedInput } from "@mui/material";
import { PALETTE } from "../../../styles/common/constants/palette";

interface Props {
  hasValue: boolean;
}

export const StyledOutlinedInput = styled(OutlinedInput, {
  shouldForwardProp: (prop) => prop !== "hasValue",
})<Props>`
  ${({ hasValue }) =>
    hasValue &&
    css`
      & {
        color: ${PALETTE.INK_MAIN};

        .MuiOutlinedInput-input {
          color: inherit;
        }
      }
    `};
`;
