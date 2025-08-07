import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { PALETTE } from "../../../../styles/common/constants/palette";
import {
  media1366Up,
  mediaDesktopSmallUp,
  mediaTabletDown,
} from "../../../../styles/common/mixins/breakpoints";
import { PanelBackgroundColor } from "./common/entities";

const CONTENT_MAX_WIDTH = 756;
const NAV_GRID_WIDTH = 280;
const NAV_MAX_WIDTH = 232;
const PADDING = 24;
const PADDING_Y = PADDING;

const COLOR: Record<PanelBackgroundColor, string | undefined> = {
  DEFAULT: PALETTE.COMMON_WHITE,
  SMOKE_LIGHT: PALETTE.SMOKE_LIGHT,
  SMOKE_LIGHTEST: PALETTE.SMOKE_LIGHTEST,
};

interface LayoutProps {
  hasNavigation?: boolean;
  panelColor?: PanelBackgroundColor;
}

interface GridProps {
  headerHeight: number;
  panelColor?: PanelBackgroundColor;
}

export const ContentLayout = styled.div<LayoutProps>`
  background-color: ${({ panelColor }) => getPanelBackgroundColor(panelColor)};
  display: grid;
  flex: 1;
  grid-template-areas: "content";
  grid-template-columns: 1fr;
  height: 100%;
  margin: 0 auto;

  ${mediaDesktopSmallUp} {
    ${({ hasNavigation }) =>
      hasNavigation
        ? css`
            grid-template-areas: "navigation content";
            grid-template-columns:
              ${NAV_GRID_WIDTH}px
              1fr;
          `
        : css`
            grid-template-areas: "content";
            grid-template-columns: 1fr;
          `};
  }

  ${media1366Up} {
    grid-template-areas: "navigation content outline";
    grid-template-columns:
      ${NAV_GRID_WIDTH}px
      1fr
      ${NAV_GRID_WIDTH}px;
  }
`;

const content = ({ headerHeight, panelColor }: GridProps) => css`
  background-color: ${getPanelBackgroundColor(panelColor)};
  padding-top: ${headerHeight}px;
`;

const navigation = ({ panelColor }: GridProps) => css`
  background-color: ${getPanelBackgroundColor(panelColor)};
`;

const positioner = ({ headerHeight }: GridProps) => css`
  max-height: 100vh;
  overflow: auto;
  padding-top: ${headerHeight}px;
  position: sticky;
  top: 0;
`;

export const NavigationGrid = styled.div<GridProps>`
  ${navigation};
  box-shadow: inset -1px 0 ${PALETTE.SMOKE_MAIN};
  display: none;
  grid-area: navigation;

  ${mediaDesktopSmallUp} {
    display: block;
  }
`;

export const ContentGrid = styled.div<GridProps>`
  ${content};
  grid-area: content;
  min-width: 0;
`;

export const OutlineGrid = styled("div")<GridProps>`
  ${navigation};
  display: none;
  grid-area: outline;

  ${media1366Up} {
    display: block;
  }
`;

export const Positioner = styled.div<GridProps>`
  ${positioner};
`;

export const Navigation = styled.div`
  box-sizing: content-box;
  margin-left: auto;
  max-width: ${NAV_MAX_WIDTH}px;
  padding: ${PADDING}px;
`;

export const Content = styled.div`
  align-self: center;
  box-sizing: content-box;
  margin: 0 auto;
  max-width: ${CONTENT_MAX_WIDTH}px;
  padding: ${PADDING_Y}px 40px;

  ${mediaTabletDown} {
    padding: ${PADDING_Y}px 16px;
  }
`;

export const Outline = styled.div`
  box-sizing: content-box;
  margin-right: auto;
  max-width: 242px;
  padding: ${PADDING_Y}px 0;
`;

/**
 * Returns the background color for the panel.
 * @param panelColor - Panel color.
 * @returns background color for the panel.
 */
function getPanelBackgroundColor(
  panelColor?: PanelBackgroundColor
): string | undefined {
  return panelColor ? COLOR[panelColor] : undefined;
}
