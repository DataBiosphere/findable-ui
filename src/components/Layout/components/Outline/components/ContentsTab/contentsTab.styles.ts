import styled from "@emotion/styled";
import { Tab } from "@mui/material";
import { FONT } from "../../../../../../styles/common/constants/font";
import { PALETTE } from "../../../../../../styles/common/constants/palette";
import { tab } from "../../outline.styles";

export const StyledTab = styled(Tab)`
  ${tab};

  && {
    align-items: center;
    align-self: flex-start;
    color: ${PALETTE.INK_LIGHT};
    font: ${FONT.UPPERCASE_500};
    pointer-events: none;
    text-transform: uppercase;
  }
`;
