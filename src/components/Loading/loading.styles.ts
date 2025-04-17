import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { COLOR_MIXES } from "../../styles/common/constants/colorMixes";
import { TABLET } from "../../theme/common/breakpoints";
import { Paper, PAPER_PANEL_STYLE } from "../common/Paper/paper";
import { LOADING_PANEL_STYLE, LoadingPanelStyle } from "./loading";

interface Props {
  panelStyle: LoadingPanelStyle;
}

export const LoadingPositioner = styled.div<Props>`
  display: grid;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;

  // Style "Inherit" - inherit border radius from parent container.
  ${({ panelStyle }) =>
    panelStyle === LOADING_PANEL_STYLE.INHERIT &&
    css`
      border-radius: inherit;
    `};
`;

export const LoadingPaper = styled(Paper)<Props>`
  background-color: ${COLOR_MIXES.COMMON_WHITE_80};
  display: grid;
  gap: 16px;
  justify-items: center;
  place-content: center center;

  // Style "Flat" paper.
  ${({ panelStyle }) =>
    panelStyle === PAPER_PANEL_STYLE.FLAT &&
    css`
      border-left: none;
      border-radius: 0;
      border-right: none;
      box-shadow: none;
    `};

  // Style "Fluid" paper.
  ${({ panelStyle, theme }) =>
    panelStyle === PAPER_PANEL_STYLE.FLUID &&
    css`
      border-radius: 8px;

      ${theme.breakpoints.down(TABLET)} {
        border-left: none;
        border-radius: 0;
        border-right: none;
        box-shadow: none;
      }
    `};

  // Style "Inherit" - borderless with no elevation, inherit border-radius from parent container.
  ${({ panelStyle }) =>
    panelStyle === LOADING_PANEL_STYLE.INHERIT &&
    css`
      border: 0;
      border-radius: inherit;
      box-shadow: none;
    `};

  // No style - borderless with no elevation.
  ${({ panelStyle }) =>
    panelStyle === PAPER_PANEL_STYLE.NONE &&
    css`
      border: 0;
      border-radius: 0;
      box-shadow: none;
    `};

  // Style "Rounded" paper.
  ${({ panelStyle }) =>
    panelStyle === PAPER_PANEL_STYLE.ROUNDED &&
    css`
      border-radius: 8px;
    `};
`;
