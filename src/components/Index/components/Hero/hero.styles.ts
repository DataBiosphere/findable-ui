import styled from "@emotion/styled";
import {
  mediaDesktopSmallUp,
  mediaTabletUp,
} from "../../../../styles/common/mixins/breakpoints";

interface Props {
  buttonWidget: boolean;
}

export const HeroLayout = styled.div`
  align-items: center;
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  padding: 0 16px;

  ${mediaTabletUp} {
    grid-template-columns: 1fr auto;
    padding: 0;
  }
`;

export const Widgets = styled.div`
  align-items: center;
  display: flex;
  height: 60px;

  ${mediaTabletUp} {
    height: 40px;
    justify-self: flex-start;
  }

  ${mediaDesktopSmallUp} {
    grid-column: 2;
    justify-self: flex-end;
  }
`;

export const SummaryWidget = styled.div<Props>`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.smoke.main};
  border-radius: 4px;
  display: flex;
  gap: 0 8px;
  flex: 1;
  height: inherit;
  padding: 12px 16px;

  ${mediaTabletUp} {
    border-radius: ${({ buttonWidget }) =>
      buttonWidget ? "4px 0 0 4px" : "4px"};
    flex: none;
  }
`;
