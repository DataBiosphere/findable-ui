import styled from "@emotion/styled";
import { Tab as MTab } from "@mui/material";
import { inkLight } from "../../../../../../styles/common/mixins/colors";
import { textUppercase500 } from "../../../../../../styles/common/mixins/fonts";
import { tab } from "../../outline.styles";

export const Tab = styled(MTab)`
  ${tab};

  && {
    ${textUppercase500};
    align-items: center;
    align-self: flex-start;
    color: ${inkLight};
    pointer-events: none;
  }
`;
