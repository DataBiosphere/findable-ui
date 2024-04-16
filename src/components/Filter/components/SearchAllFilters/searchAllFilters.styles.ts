import styled from "@emotion/styled";
import { Autocomplete as MAutocomplete } from "@mui/material";
import { inkMain } from "../../../../styles/common/mixins/colors";

export const Autocomplete = styled(MAutocomplete)`
  &.Mui-expanded {
    .MuiOutlinedInput-root {
      .MuiIconButton-root {
        .MuiSvgIcon-root {
          color: ${inkMain};
        }
      }
    }
  }
` as typeof MAutocomplete;
