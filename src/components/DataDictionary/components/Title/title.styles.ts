import styled from "@emotion/styled";
import { mediaTabletDown } from "../../../../styles/common/mixins/breakpoints";
import { Title } from "../../../common/Title/title";

export const StyledTitle = styled(Title)`
  & {
    font-size: 34px;
    grid-column: 1 / -1;
    letter-spacing: normal;
    line-height: 42px;
    margin-bottom: 8px;

    ${mediaTabletDown} {
      font-size: 26px;
      line-height: 34px;
    }
  }
`;
