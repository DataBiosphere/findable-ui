import styled from "@emotion/styled";
import { Tab } from "@mui/material";
import { inkLight } from "../../../../../../styles/common/mixins/colors";
import { textUppercase500 } from "../../../../../../styles/common/mixins/fonts";
import { tab } from "../../outline.styles";

export const StyledTab = styled(Tab)`
  ${tab};

  && {
    ${textUppercase500};
    align-items: center;
    align-self: flex-start;
    color: ${inkLight};
    pointer-events: none;
  }
`;
