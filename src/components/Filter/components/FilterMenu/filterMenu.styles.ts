import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";
import { FONT } from "../../../../styles/common/constants/font";
import { mediaDesktopSmallUp } from "../../../../styles/common/mixins/breakpoints";

interface Props {
  menuWidth: number;
}

export const FilterView = styled.div<Props>`
  width: ${({ menuWidth }) => `${menuWidth}px`};
`;

export const FilterViewTools = styled.div`
  margin: 24px 0 8px;

  ${mediaDesktopSmallUp} {
    margin: 0;
  }
}
`;

export const Button = styled(ButtonBase)`
  align-items: center;
  display: flex;
  font: ${FONT.BODY_LARGE_500};
  gap: 8px;
  justify-content: flex-start;
  padding: 12px 16px;
  width: 100%;
`;
