import styled from "@emotion/styled";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { mediaUpSmall } from "../../../../styles/common/mixins/breakpoints";

export const Pagination = styled.div`
  align-items: center;
  background-color: ${PALETTE.COMMON_WHITE};
  color: ${PALETTE.INK_MAIN};
  display: flex;
  gap: 16px;
  justify-content: space-between;
  padding: 20px;

  ${mediaUpSmall} {
    justify-content: flex-start;
  }
`;
