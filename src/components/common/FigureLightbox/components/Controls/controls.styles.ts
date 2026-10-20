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

  // MUI lets pointer events pass through a disabled button; here they would
  // land on the slide behind it and close the lightbox. A disabled button keeps
  // its background on hover and press.
  &.Mui-disabled {
    pointer-events: auto;

    &:hover,
    &:active {
      background-color: ${PALETTE.COMMON_WHITE};
    }
  }
`;

export const StyledCaptionBar = styled.div`
  ${bar};
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .MuiTypography-root {
    color: ${PALETTE.INK_MAIN};
    max-width: 640px;
    text-align: center;
  }

  .MuiLink-root {
    color: ${PALETTE.INK_MAIN};
  }

  // The theme sets inline code to a fixed small size; in the caption it matches
  // the caption text, keeping the theme's monospace font. The caption is
  // portalled out of the page, so the page's content styles don't reach it.
  code {
    font-size: inherit;
    line-height: inherit;
  }
`;
