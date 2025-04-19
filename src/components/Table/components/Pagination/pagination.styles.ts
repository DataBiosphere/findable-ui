import styled from "@emotion/styled";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { TABLET } from "../../../../theme/common/breakpoints";

export const Pagination = styled.div`
  align-items: center;
  background-color: ${PALETTE.COMMON_WHITE};
  color: ${PALETTE.INK_MAIN};
  display: flex;
  gap: 16px;
  justify-content: space-between;
  padding: 20px;

  ${({ theme }) => theme.breakpoints.up(TABLET)} {
    justify-content: flex-start;
  }
`;
