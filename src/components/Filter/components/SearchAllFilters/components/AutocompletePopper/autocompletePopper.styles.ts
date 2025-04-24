import styled from "@emotion/styled";
import { Popper as MPopper } from "@mui/material";
import { PALETTE } from "../../../../../../styles/common/constants/palette";
import { mediaDownMedium } from "../../../../../../styles/common/mixins/breakpoints";

export const AutocompletePopper = styled(MPopper)`
  ${mediaDownMedium} {
    .MuiPaper-root {
      background-color: ${PALETTE.SMOKE_LIGHT};

      .MuiList-root {
        margin: 0;
      }
    }
  }
`;
