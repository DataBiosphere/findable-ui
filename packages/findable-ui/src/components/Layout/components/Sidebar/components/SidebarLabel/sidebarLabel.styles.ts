import styled from "@emotion/styled";
import { DESKTOP } from "../../../../../../theme/common/breakpoints";

export const SidebarLabel = styled.div`
  padding: 0 24px;

  ${({ theme }) => theme.breakpoints.up(DESKTOP)} {
    margin: 8px 0;
    padding: 8px 16px;
  }
`;
