import styled from "@emotion/styled";
import { DESKTOP_SM } from "../../../../../../../../theme/common/breakpoints";

export const HeaderActions = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  gap: 8px;
  justify-content: flex-end;

  ${({ theme }) => theme.breakpoints.up(DESKTOP_SM)} {
    flex: none;
  }
`;
