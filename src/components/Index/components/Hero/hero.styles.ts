import styled from "@emotion/styled";
import { PALETTE } from "../../../../styles/common/constants/palette";
import {
  mediaUpMedium,
  mediaUpSmall,
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

  ${mediaUpSmall} {
    grid-template-columns: 1fr auto;
    padding: 0;
  }
`;

export const Widgets = styled.div`
  align-items: center;
  display: flex;
  height: 60px;

  ${mediaUpSmall} {
    height: 40px;
    justify-self: flex-start;
  }

  ${mediaUpMedium} {
    grid-column: 2;
    justify-self: flex-end;
  }
`;

export const SummaryWidget = styled.div<Props>`
  align-items: center;
  border: 1px solid ${PALETTE.SMOKE_MAIN};
  border-radius: 4px;
  display: flex;
  gap: 0 8px;
  flex: 1;
  height: inherit;
  padding: 12px 16px;

  ${mediaUpSmall} {
    border-radius: ${({ buttonWidget }) =>
      buttonWidget ? "4px 0 0 4px" : "4px"};
    flex: none;
  }
`;
