import styled from "@emotion/styled";
import { bpDownSm } from "../../../../../styles/common/mixins/breakpoints";
import { RoundedPaper } from "../RoundedPaper/roundedPaper";

export const StyledPaper = styled(RoundedPaper)`
  ${bpDownSm} {
    border-left: none;
    border-radius: 0;
    border-right: none;
  }
`;
