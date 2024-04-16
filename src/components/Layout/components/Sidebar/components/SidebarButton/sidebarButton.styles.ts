import styled from "@emotion/styled";
import {
  mediaDesktopSmallUp,
  mediaTabletUp,
} from "../../../../../../styles/common/mixins/breakpoints";
import {
  primaryMain,
  white,
} from "../../../../../../styles/common/mixins/colors";
import { ButtonSecondary } from "../../../../../common/Button/components/ButtonSecondary/buttonSecondary";

export const SidebarButton = styled(ButtonSecondary)`
  grid-column: 1 / -1;
  padding: 10px;

  ${mediaTabletUp} {
    grid-column: 2;
    justify-self: flex-end;
  }

  ${mediaDesktopSmallUp} {
    display: none;
  }
`;

export const Badge = styled.div`
  align-items: center;
  background-color: ${primaryMain};
  border-radius: 10px;
  color: ${white};
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
