import styled from "@emotion/styled";
import { Tab } from "@mui/material";
import { FONT } from "../../../../../../styles/common/constants/font";
import { inkLight } from "../../../../../../styles/common/mixins/colors";
import { tab } from "../../outline.styles";

export const StyledTab = styled(Tab)`
  ${tab};

  && {
    align-items: center;
    align-self: flex-start;
    color: ${inkLight};
    font: ${FONT.UPPERCASE_500};
    pointer-events: none;
    text-transform: uppercase;
  }
`;
