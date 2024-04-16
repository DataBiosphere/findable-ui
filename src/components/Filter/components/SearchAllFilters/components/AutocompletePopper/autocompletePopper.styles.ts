import styled from "@emotion/styled";
import { Popper as MPopper } from "@mui/material";
import { mediaDesktopSmallDown } from "../../../../../../styles/common/mixins/breakpoints";
import { smokeLight } from "../../../../../../styles/common/mixins/colors";

export const AutocompletePopper = styled(MPopper)`
  ${mediaDesktopSmallDown} {
    .MuiPaper-root {
      background-color: ${smokeLight};

      .MuiList-root {
        margin: 0;
      }
    }
  }
`;
