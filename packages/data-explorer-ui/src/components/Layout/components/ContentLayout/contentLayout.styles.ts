import styled from "@emotion/styled";
import { textBodyLarge4002Lines } from "../../../../styles/common/mixins/fonts";
import { DESKTOP_SM, TABLET } from "../../../../theme/common/breakpoints";

const CONTENT_GRID_WIDTH = 734;
const NAV_MAX_WIDTH = 232;
const PADDING = 24;
const PADDING_X = PADDING;
const PADDING_Y = PADDING;

export const ContentLayout = styled.div`
  background-color: ${({ theme }) => theme.palette.common.white};
  display: grid;
  flex: 1;
  grid-template-areas: "navigation content outline";
  grid-template-columns:
    minmax(360px, auto) minmax(auto, ${CONTENT_GRID_WIDTH}px)
    minmax(346px, auto);
  height: 100%;
  margin: 0 auto;

  ${({ theme }) => theme.breakpoints.down(DESKTOP_SM)} {
    grid-template-areas: "navigation content";
    grid-template-columns: ${NAV_MAX_WIDTH + PADDING_X * 2}px fit-content(
        ${CONTENT_GRID_WIDTH}px
      );
  }

  ${({ theme }) => theme.breakpoints.down(TABLET)} {
    grid-template-areas: "content";
    grid-template-columns: 1fr;
  }
`;

export const NavigationGrid = styled.div`
  background-color: ${({ theme }) => theme.palette.smoke.light};
  box-shadow: inset -1px 0 ${({ theme }) => theme.palette.smoke.main};
  grid-area: navigation;

  ${({ theme }) => theme.breakpoints.down(TABLET)} {
    display: none;
  }
`;

export const ContentGrid = styled.div`
  grid-area: content;
`;

export const OutlineGrid = styled.div`
  grid-area: outline;

  ${({ theme }) => theme.breakpoints.down(DESKTOP_SM)} {
    display: none;
  }
`;

export const Navigation = styled.div`
  box-sizing: content-box;
  margin-left: auto;
  max-width: ${NAV_MAX_WIDTH}px;
  padding: ${PADDING}px;
`;

export const Content = styled.div`
  padding: ${PADDING_Y}px 40px;

  p {
    ${textBodyLarge4002Lines}
  }

  ${({ theme }) => theme.breakpoints.down(TABLET)} {
    padding: ${PADDING_Y}px 16px;
  }
`;

export const Outline = styled.div`
  box-sizing: content-box;
  margin-right: auto;
  max-width: 242px;
  padding: ${PADDING_Y}px 0;
`;
