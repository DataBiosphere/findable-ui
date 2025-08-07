import styled from "@emotion/styled";
import { bpDown1024, bpDownSm } from "../../styles/common/mixins/breakpoints";

export const View = styled("div")`
  column-gap: 24px;
  display: grid;
  flex: 1;
  grid-template-columns: 242px 1fr;
  margin: 0 24px;
  position: relative;

  ${bpDown1024} {
    grid-template-columns: 1fr;
    margin: 0 16px;
  }

  ${bpDownSm} {
    margin: 0;
  }
`;
