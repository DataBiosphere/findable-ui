import styled from "@emotion/styled";
import { Autocomplete as MAutocomplete } from "@mui/material";
import { PALETTE } from "../../../../styles/common/constants/palette";

export const Autocomplete = styled(MAutocomplete)`
  &.Mui-expanded {
    .MuiOutlinedInput-root {
      .MuiIconButton-root {
        .MuiSvgIcon-root {
          color: ${PALETTE.INK_MAIN};
        }
      }
    }
  }
` as typeof MAutocomplete;
