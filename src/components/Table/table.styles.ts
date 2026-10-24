import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { PALETTE } from "../../styles/common/constants/palette";
import { SUPPORTS_SCROLL_DRIVEN_ANIMATIONS } from "../../styles/common/constants/supports";
import { bpDownSm, bpUpSm } from "../../styles/common/mixins/breakpoints";
import { pinned } from "../../styles/common/mixins/pinned";
import {
  TABLE_HEAD_TOP,
  TABLE_SCROLL_VIEW_TIMELINE,
  TABLE_SCROLL_X_TIMELINE,
} from "./common/constants";
import { GridTable as Table } from "./common/gridTable.styles";

interface Props {
  collapsable?: boolean;
}

/**
 * Styles for a collapsible table with support for virtualization.
 *
 * When the table is in a collapsed view, the table head must remain in the DOM flow
 * to ensure virtualization calculations work correctly on initial mount.
 *
 * To achieve this, the table head is visually hidden using `visibility: hidden` and a nominal height
 * of 1px, instead of being removed with `display: none`. This maintains its layout contribution.
 *
 * The standard grid styling—normally applied at the paper level and stripped from the table—is
 * reassigned to the table body. This includes adding a `1px` gap between body rows, while removing
 * the gap above the table body to visually obscure the 1px header space.
 */

export const GridTable = styled(Table, {
  shouldForwardProp: (prop) => prop !== "collapsable",
})<Props>`
  // Collapsable.
  ${bpDownSm} {
    ${({ collapsable }) =>
      collapsable &&
      css`
        && {
          background-color: ${PALETTE.COMMON_WHITE};
          gap: 0;
          grid-template-columns: 1fr;

          .MuiTableHead-root {
            height: 1px;
            visibility: hidden;

            .MuiTableRow-head,
            .MuiTableCell-head {
              display: none;
            }
          }

          .MuiTableBody-root {
            background-color: ${PALETTE.SMOKE_MAIN};
            gap: 1px;
          }
        }
      `};
  }
`;

/**
 * Holds the table's sideways scroll box and a copy of its column head. The page
 * scrolls, not the table, and the box scrolls sideways, so the table's own head
 * can't pin to the window; the copy pins instead and follows the box's sideways
 * scroll through a scroll-driven animation. Clipping here ends the copy where
 * the table ends. The copy only shows once the table's top has scrolled past the
 * pin line; until then, the table's own head is in view, focus ring included.
 */
export const StyledTableScroll = styled.div`
  border-top: 1px solid ${PALETTE.SMOKE_MAIN}; /* below the toolbar */
  min-width: 0;
  overflow: clip; /* not hidden: a scroll container would stop the head copy pinning */
  timeline-scope: ${TABLE_SCROLL_X_TIMELINE};
  view-timeline: ${TABLE_SCROLL_VIEW_TIMELINE} block;
  view-timeline-inset: var(${TABLE_HEAD_TOP}, 0px) 0px;

  .MuiTableContainer-root {
    scroll-timeline: ${TABLE_SCROLL_X_TIMELINE} x;
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${PALETTE.SMOKE_MAIN}; /* above the pagination */
  }

  .MuiTable-root {
    background-color: ${PALETTE.SMOKE_MAIN}; /* shows through the gaps between rows */
    min-width: min-content; /* a wide table is as wide as its columns, so both tables scroll the same distance */
  }

  /* Fallback: the box scrolls both ways and the table's own head pins in it. */
  @supports not ${SUPPORTS_SCROLL_DRIVEN_ANIMATIONS} {
    display: grid;
    min-height: 0;
    overflow: hidden;
  }
`;

/**
 * The pinned copy of the column head: hidden from assistive technology, out of
 * the tab order, and only shown where scroll-driven animations keep it aligned.
 */
export const StyledStickyHead = styled.div`
  container-type: inline-size;
  display: none;
  height: 0;
  z-index: 3;
  ${pinned(`var(${TABLE_HEAD_TOP}, 0px)`)};

  > div {
    left: 0;
    overflow: hidden;
    padding-bottom: 1px; /* keeps the head's 1px bottom line, a shadow, inside the clip */
    position: absolute;
    right: 0;
    top: 0;
  }

  /* From sm up (below it, rows are cards without a head). Shown only while
     the table's top is above the pin line (exit-crossing of the inset view
     timeline): at rest the table's own head is in view, not covered. */
  @supports ${SUPPORTS_SCROLL_DRIVEN_ANIMATIONS} {
    ${bpUpSm} {
      animation: table-head-pinned linear;
      animation-range: exit-crossing 0% exit-crossing 100%;
      animation-timeline: ${TABLE_SCROLL_VIEW_TIMELINE};
      display: block;
      visibility: hidden;

      .MuiTable-root {
        animation: table-head-scroll-x linear both;
        animation-timeline: ${TABLE_SCROLL_X_TIMELINE};
      }
    }
  }

  @keyframes table-head-pinned {
    from,
    to {
      visibility: visible;
    }
  }

  @keyframes table-head-scroll-x {
    to {
      transform: translateX(calc(-100% + 100cqw));
    }
  }
`;
