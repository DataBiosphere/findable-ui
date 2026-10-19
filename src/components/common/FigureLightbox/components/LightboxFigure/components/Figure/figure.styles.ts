import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";
import { COLOR_MIXES } from "../../../../../../../styles/common/constants/colorMixes";
import { PALETTE } from "../../../../../../../styles/common/constants/palette";

export const StyledFigure = styled.figure`
  margin: 0;
`;

export const StyledHint = styled.span`
  align-items: center;
  background-color: ${PALETTE.COMMON_WHITE};
  border-radius: 4px;
  box-shadow:
    inset 0 0 0 1px ${PALETTE.SMOKE_DARK},
    0 1px 0 0 ${COLOR_MIXES.COMMON_BLACK_05};
  color: ${PALETTE.INK_MAIN};
  display: flex;
  opacity: 0;
  padding: 6px;
  position: absolute;
  right: 8px;
  top: 8px;
  transition: opacity 150ms ease-in-out;
`;

export const StyledButton = styled(ButtonBase)`
  cursor: zoom-in;
  display: block;
  position: relative;
  width: 100%;

  img {
    display: block;
    height: auto;
    max-width: 100%;
  }

  &:hover,
  &.Mui-focusVisible {
    .figure-hint {
      opacity: 1;
    }
  }

  &.Mui-focusVisible {
    outline: 2px solid ${PALETTE.PRIMARY_MAIN};
    outline-offset: 2px;
  }

  // Touch screens have no hover, so the hint always shows.
  @media (hover: none) {
    .figure-hint {
      opacity: 1;
    }
  }
`;
