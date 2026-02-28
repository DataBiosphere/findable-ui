import styled from "@emotion/styled";
import { Autocomplete } from "@mui/material";

export const StyledAutocomplete = styled(Autocomplete)`
  &.MuiAutocomplete-root {
    grid-column: 1 / -1;

    .MuiOutlinedInput-root {
      padding: 0 12px;

      .MuiAutocomplete-input {
        padding: 10px 0;
      }
    }
  }
` as typeof Autocomplete;
