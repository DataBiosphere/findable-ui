import styled from "@emotion/styled";
import { mediaTabletDown } from "../../../../../styles/common/mixins/breakpoints";
import { RoundedPaper } from "../RoundedPaper/roundedPaper";

export const StyledPaper = styled(RoundedPaper)`
  ${mediaTabletDown} {
    border-left: none;
    border-radius: 0;
    border-right: none;
    box-shadow: none;
  }
`;
