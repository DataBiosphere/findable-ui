import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  media1366Up,
  mediaDesktopSmallUp,
  mediaTabletDown,
} from "../../../../styles/common/mixins/breakpoints";
import {
  smokeLight,
  smokeLightest,
  smokeMain,
  white,
} from "../../../../styles/common/mixins/colors";
import { ThemeProps } from "../../../../theme/theme";
import { PanelBackgroundColor } from "./common/entities";

const CONTENT_MAX_WIDTH = 756;
const NAV_GRID_WIDTH = 280;
const NAV_MAX_WIDTH = 232;
const PADDING = 24;
const PADDING_Y = PADDING;

const COLOR: Record<
  PanelBackgroundColor,
  ({ theme }: ThemeProps) => string | undefined
> = {
  DEFAULT: white,
  SMOKE_LIGHT: smokeLight,
  SMOKE_LIGHTEST: smokeLightest,
};

interface LayoutProps {
  panelColor?: PanelBackgroundColor;
}

interface GridProps {
  headerHeight: number;
  panelColor?: PanelBackgroundColor;
}

export const ContentLayout = styled.div<LayoutProps>`
  background-color: ${({ panelColor, theme }) =>
    getPanelBackgroundColor(theme, panelColor)};
  display: grid;
  flex: 1;
  grid-template-areas: "content";
  grid-template-columns: 1fr;
  height: 100%;
  margin: 0 auto;

  ${mediaDesktopSmallUp} {
    grid-template-areas: "navigation content";
    grid-template-columns:
      ${NAV_GRID_WIDTH}px
      1fr;
  }

  ${media1366Up} {
    grid-template-areas: "navigation content outline";
    grid-template-columns:
      ${NAV_GRID_WIDTH}px
      1fr
      ${NAV_GRID_WIDTH}px;
  }
`;

const content = ({
  headerHeight,
  panelColor,
  theme,
}: GridProps & ThemeProps) => css`
  background-color: ${getPanelBackgroundColor(theme, panelColor)};
  padding-top: ${headerHeight}px;
`;

const navigation = ({ panelColor, theme }: GridProps & ThemeProps) => css`
  background-color: ${getPanelBackgroundColor(theme, panelColor)};
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
  box-shadow: inset -1px 0 ${smokeMain};
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
 * @param theme - Theme.
 * @param panelColor - Panel color.
 * @returns background color for the panel.
 */
function getPanelBackgroundColor(
  theme: ThemeProps["theme"],
  panelColor?: PanelBackgroundColor
): string | undefined {
  return panelColor ? COLOR[panelColor]({ theme }) : undefined;
}
