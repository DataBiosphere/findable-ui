import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { inkMain } from "../../../../styles/common/mixins/colors";
import { inkLight } from "../../../../theme/common/palette";

export const InputField = styled(TextField)`
  && {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .MuiInputBase-root {
      & ::placeholder {
        color: ${inkLight};
        opacity: 0.8;
      }

      &.Mui-focused {
        & ::placeholder {
          opacity: 0;
        }
      }
    }

    .MuiOutlinedInput-root {
      &.MuiInputBase-sizeSmall {
        padding: 0 0 0 12px;

        .MuiAutocomplete-input {
          color: ${inkMain};
          padding: 10px 14px 10px 0;
        }
      }
    }
  }
`;
