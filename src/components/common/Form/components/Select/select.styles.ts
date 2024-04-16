import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FormControl } from "@mui/material";
import { inkMain } from "../../../../../styles/common/mixins/colors";

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
  ${({ isFilled, ...props }) =>
    isFilled &&
    css`
      & .MuiOutlinedInput-input,
      .MuiSvgIcon-root {
        color: ${inkMain(props)};
      }
    `};
`;
