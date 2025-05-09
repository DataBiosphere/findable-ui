import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";
import { mediaDesktopSmallUp } from "../../../../styles/common/mixins/breakpoints";
import { textBodyLarge500 } from "../../../../styles/common/mixins/fonts";

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

export const StyledButtonBase = styled(ButtonBase)`
  ${textBodyLarge500};
  align-items: center;
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  padding: 12px 16px;
  width: 100%;
`;
