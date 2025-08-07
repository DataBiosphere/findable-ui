import styled from "@emotion/styled";
import { PALETTE } from "../../../../../../styles/common/constants/palette";
import {
  bpUpSm,
  mediaDesktopSmallUp,
} from "../../../../../../styles/common/mixins/breakpoints";
import { ButtonSecondary } from "../../../../../common/Button/components/ButtonSecondary/buttonSecondary";

export const SidebarButton = styled(ButtonSecondary)`
  grid-column: 1 / -1;
  padding: 10px;

  ${bpUpSm} {
    grid-column: 2;
    justify-self: flex-end;
  }

  ${mediaDesktopSmallUp} {
    display: none;
  }
`;

export const Badge = styled.div`
  align-items: center;
  background-color: ${PALETTE.PRIMARY_MAIN};
  border-radius: 10px;
  color: ${PALETTE.COMMON_WHITE};
  display: flex;
  flex: none;
  font-size: 12px;
  font-weight: 600;
  height: 18px;
  justify-content: center;
  line-height: 16px;
  min-width: 20px;
  padding: 0 6px;
`;
