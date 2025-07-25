import styled from "@emotion/styled";
import { bpDown820 } from "../../../../styles/common/mixins/breakpoints";
import { Title } from "../../../common/Title/title";

export const StyledTitle = styled(Title)`
  & {
    font-size: 34px;
    grid-column: 1 / -1;
    letter-spacing: normal;
    line-height: 42px;
    margin: 24px 0 8px;

    ${bpDown820} {
      font-size: 26px;
      line-height: 34px;
    }
  }
`;
