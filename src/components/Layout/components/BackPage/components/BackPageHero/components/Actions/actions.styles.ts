import styled from "@emotion/styled";
import { mediaUpSmall } from "../../../../../../../../styles/common/mixins/breakpoints";

export const BackPageHeroActions = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
  gap: 16px;
  justify-self: flex-start;

  ${mediaUpSmall} {
    justify-self: flex-end;
  }
`;
