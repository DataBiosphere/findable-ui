import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FormControl } from "@mui/material";
import { inkLight, inkMain } from "../../../../../styles/common/mixins/colors";

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
      color: ${inkLight};
      opacity: 0.8;
    }

    &.Mui-focused {
      input::placeholder,
      textarea::placeholder {
        opacity: 0;
      }
    }

    // Input filled.
    ${({ isFilled, ...props }) =>
      isFilled &&
      css`
        & .MuiOutlinedInput-input,
        .MuiSvgIcon-root {
          color: ${inkMain(props)};
        }
      `};
  }

  .MuiFormHelperText-root {
    align-items: flex-start;
    display: flex;
    gap: 4px;
  }
`;
