import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { COLOR_MIXES } from "../../../../../styles/common/constants/colorMixes";
import { PALETTE } from "../../../../../styles/common/constants/palette";
import { bpDownSm } from "../../../../../styles/common/mixins/breakpoints";

// The bars are translucent and blurred, so a zoomed figure shows through them.
const bar = css`
  backdrop-filter: blur(12px);
  background-color: ${COLOR_MIXES.SMOKE_MAIN_64};
  left: 0;
  padding: 16px;
  position: absolute;
  right: 0;
`;

export const StyledTopBar = styled.div`
  ${bar};
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  top: 0;

  > .MuiTypography-root {
    color: ${PALETTE.INK_MAIN};
  }
`;

export const StyledActions = styled.div`
  align-items: center;
  display: flex;
  gap: 24px;

  ${bpDownSm} {
    gap: 8px;
  }
`;

export const StyledZoomActions = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;

  // Phones zoom by pinch and double-tap.
  ${bpDownSm} {
    display: none;
  }
`;

export const StyledNavButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  &.prev {
    left: 16px;
  }

  &.next {
    right: 16px;
  }

  // Phones move between figures by swiping.
  ${bpDownSm} {
    display: none;
  }
`;

export const StyledCaptionBar = styled.div`
  ${bar};
  bottom: 0;
  display: flex;
  justify-content: center;

  .MuiTypography-root {
    color: ${PALETTE.INK_MAIN};
    max-width: 640px;
    text-align: center;
  }

  .MuiLink-root {
    color: inherit;
    font: inherit;
    vertical-align: baseline;
  }
`;
