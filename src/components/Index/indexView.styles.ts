import type { SerializedStyles, Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { PROPERTY } from "../../hooks/useHtmlStyle/constants";
import { PALETTE } from "../../styles/common/constants/palette";
import {
  bpDownMd,
  bpDownSm,
  bpUpSm,
} from "../../styles/common/mixins/breakpoints";
import { pinned, pinnedFocus } from "../../styles/common/mixins/pinned";
import { FluidPaper } from "../common/Paper/components/FluidPaper/fluidPaper";
import { HEADER_HEIGHT_VAR } from "../Layout/components/Header/common/constants";
import { SUPPORTS_PAGE_SCROLL } from "../Table/common/constants";

const ENTITY_LIST_GAP = 16;
const TABLE_HEAD_HEIGHT = 57; /* a one-line column head and its bottom line */
const ENTITY_LAYOUT_BOTTOM = `calc(${HEADER_HEIGHT_VAR} + var(${PROPERTY.ENTITY_LAYOUT_HEIGHT}, 57px))`;

/**
 * Index pages pin the entity layout row (with tabs, or below md, where it holds
 * the filter button) and, from sm up, the column head below the header, so
 * focus and hash links stop below them too. :root outranks the header's html
 * scroll padding.
 * @param theme - MUI theme.
 * @returns Global scroll padding styles for index pages.
 */
export const indexScrollPadding = (theme: Theme): SerializedStyles => css`
  :root {
    --index-scroll-padding-top: ${HEADER_HEIGHT_VAR};
    scroll-padding-top: var(--index-scroll-padding-top);
  }

  :root:has(.MuiTabs-root) {
    --index-scroll-padding-top: ${ENTITY_LAYOUT_BOTTOM};
  }

  ${bpDownMd({ theme })} {
    :root {
      --index-scroll-padding-top: ${ENTITY_LAYOUT_BOTTOM};
    }
  }

  /* The column head pins only where its copy can follow the table's sideways scroll. */
  @supports ${SUPPORTS_PAGE_SCROLL} {
    ${bpUpSm({ theme })} {
      :root {
        scroll-padding-top: calc(
          var(--index-scroll-padding-top) + ${ENTITY_LIST_GAP}px +
            ${TABLE_HEAD_HEIGHT}px
        );
      }
    }
  }
`;

/**
 * The page scrolls; the entity layout row, when it has tabs or below md, and the
 * table's column head pin below the header. The head pins 16px below the entity
 * layout row, or 16px below the header when the row (a title) scrolls away.
 */
export const StyledGridEntityView = styled(Grid)`
  --table-head-top: calc(${HEADER_HEIGHT_VAR} + ${ENTITY_LIST_GAP}px);
  align-content: flex-start;
  display: grid;
  flex: 1;
  gap: 0;
  min-width: 0;

  &:has(.MuiTabs-root) {
    --table-head-top: calc(${ENTITY_LAYOUT_BOTTOM} + ${ENTITY_LIST_GAP}px);
  }

  ${bpDownMd} {
    --table-head-top: calc(${ENTITY_LAYOUT_BOTTOM} + ${ENTITY_LIST_GAP}px);
  }

  /* Fallback: the page fits the window and the table scrolls in its own box. */
  @supports not ${SUPPORTS_PAGE_SCROLL} {
    contain: size; /* fills the main row without growing it */
    height: 100%;
    overflow: hidden;

    /* Below md the footer is too tall to keep on screen: fill the window below the header and let the footer follow. */
    ${bpDownMd} {
      height: calc(100vh - ${HEADER_HEIGHT_VAR});
    }
  }
`;

const pinnedEntityLayout = css`
  background-color: ${PALETTE.BACKGROUND_DEFAULT};
  z-index: 5; /* above the band below it */
  ${pinned(HEADER_HEIGHT_VAR)};
  ${pinnedFocus};
`;

export const StyledGridEntityLayout = styled(Grid)`
  align-items: center;
  gap: 16px;
  min-height: 56px;
  padding: 0 16px;
  position: relative; /* required; positions box-shadow */

  &:after {
    content: "";
    bottom: 0;
    box-shadow: inset 0 -1px 0 0 ${PALETTE.SMOKE_MAIN};
    height: 1px;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 2;
  }

  &:empty {
    display: none;
  }

  .MuiGrid-root {
    align-items: center;

    &:empty {
      display: none;
    }
  }

  /* Tabs, and below md the filter button, stay in reach as the page scrolls;
     a title alone scrolls away. */
  @supports ${SUPPORTS_PAGE_SCROLL} {
    &:has(.MuiTabs-root) {
      ${pinnedEntityLayout};
    }

    ${bpDownMd} {
      ${pinnedEntityLayout};
    }
  }
`;

export const StyledFluidPaper = styled(FluidPaper)`
  background-color: ${PALETTE.SMOKE_MAIN};
  display: grid;
  gap: 1px;
  overflow: clip; /* not hidden: a scroll container would stop the column head pinning */
  position: relative; /* required; positions table loading indicator */

  @supports not ${SUPPORTS_PAGE_SCROLL} {
    overflow: hidden;
  }

  /* The table draws its own lines, so no paper shows between its parts, e.g. in an overscroll bounce. */
  &:has(.MuiTableContainer-root) {
    background-color: ${PALETTE.COMMON_WHITE};
    gap: 0;
  }
`;

export const StyledGridEntityList = styled(Grid)`
  display: grid;
  gap: ${ENTITY_LIST_GAP}px;
  margin: ${ENTITY_LIST_GAP}px;

  /* A band that pins with the column head: it masks the rows scrolling through
     the gap above the head and draws the table's rounded top edge over it.
     Ordered after the list's alerts, at the top edge of the table. */
  &::before {
    border: 1px solid ${PALETTE.SMOKE_MAIN};
    border-bottom: none;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 -8px 0 8px ${PALETTE.BACKGROUND_DEFAULT};
    content: "";
    height: 8px;
    margin-bottom: -8px;
    order: 1;
    pointer-events: none;
    z-index: 4; /* above the column head, including a pinned copy of it */
    ${pinned("var(--table-head-top)")};

    /* Without scroll-driven animations the column head doesn't pin (see the
       Table's sticky head), so neither does the band. */
    @supports not ${SUPPORTS_PAGE_SCROLL} {
      display: none;
    }
  }

  > :last-child {
    order: 2;

    /* Sits under the band; without the band, the gap above it stays. */
    @supports ${SUPPORTS_PAGE_SCROLL} {
      margin-top: -${ENTITY_LIST_GAP}px;
    }
  }

  @supports not ${SUPPORTS_PAGE_SCROLL} {
    overflow: hidden;
  }

  ${bpDownSm} {
    margin: ${ENTITY_LIST_GAP}px 0;

    &::before {
      display: none;
    }

    > :last-child {
      margin-top: 0;
    }
  }
`;
