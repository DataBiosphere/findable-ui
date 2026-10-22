import styled from "@emotion/styled";
import { COLOR_MIXES } from "../../../../../styles/common/constants/colorMixes";
import { PALETTE } from "../../../../../styles/common/constants/palette";

export const StyledZoomControl = styled.div`
  align-items: center;
  background-color: ${PALETTE.COMMON_WHITE};
  border-radius: 4px;
  box-shadow:
    inset 0 0 0 1px ${PALETTE.SMOKE_DARK},
    inset 0 2px 0 0 ${COLOR_MIXES.COMMON_BLACK_04};
  display: flex;
  gap: 2px;
  height: 36px;
  padding: 0 4px;

  .MuiTypography-root {
    color: ${PALETTE.INK_MAIN};
    min-width: 40px;
    opacity: 0.8;
    text-align: center;
  }

  .MuiIconButton-root {
    padding: 4px;
  }
`;
