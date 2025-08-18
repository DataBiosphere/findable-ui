import styled from "@emotion/styled";
import { Autocomplete } from "@mui/material";

export const StyledAutocomplete = styled(Autocomplete)`
  &.MuiAutocomplete-root {
    .MuiOutlinedInput-root {
      padding: 0 12px;

      .MuiAutocomplete-input {
        padding: 10px 0;
      }
    }
  }
` as typeof Autocomplete;
