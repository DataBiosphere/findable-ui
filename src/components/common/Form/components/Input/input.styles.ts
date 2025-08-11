import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FormControl } from "@mui/material";
import { PALETTE } from "../../../../../styles/common/constants/palette";

interface Props {
  isFilled?: boolean;
}

export const InputFormControl = styled(FormControl, {
  shouldForwardProp: (prop) => prop !== "isFilled",
})<Props>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .MuiOutlinedInput-root {
    .MuiOutlinedInput-input {
      padding: 10px 12px 10px 0;
    }

    &.MuiInputBase-multiline {
      padding: 0 0 0 10px;
    }

    input::placeholder,
    textarea::placeholder {
      color: ${PALETTE.INK_LIGHT};
      opacity: 0.8;
    }

    &.Mui-focused {
      input::placeholder,
      textarea::placeholder {
        opacity: 0;
      }
    }

    // Input filled.
    ${({ isFilled }) =>
      isFilled &&
      css`
        & .MuiOutlinedInput-input,
        .MuiSvgIcon-root {
          color: ${PALETTE.INK_MAIN};
        }
      `};
  }

  .MuiFormHelperText-root {
    align-items: flex-start;
    display: flex;
    gap: 4px;
  }
`;
