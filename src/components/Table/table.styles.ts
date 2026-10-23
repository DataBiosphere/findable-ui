import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { PALETTE } from "../../styles/common/constants/palette";
import { SUPPORTS_PAGE_SCROLL } from "../../styles/common/constants/supports";
import { bpDownSm } from "../../styles/common/mixins/breakpoints";
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
 * the table ends.
 */
export const StyledTableScroll = styled.div`
  border-top: 1px solid ${PALETTE.SMOKE_MAIN}; /* below the toolbar */
  min-width: 0;
  overflow: clip; /* not hidden: a scroll container would stop the head copy pinning */
  timeline-scope: --table-scroll-x;

  /* Keyboard focus in the table's own head shows through the copy over it. */
  &:has(.MuiTableContainer-root .MuiTableHead-root :focus-visible)
    > [aria-hidden] {
    visibility: hidden;
  }

  .MuiTableContainer-root {
    --table-head-top: 0px; /* the table's own head scrolls away with the rows */
    scroll-timeline: --table-scroll-x x;
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${PALETTE.SMOKE_MAIN}; /* above the pagination */
  }

  .MuiTable-root {
    background-color: ${PALETTE.SMOKE_MAIN}; /* shows through the gaps between rows */
    min-width: min-content; /* a wide table is as wide as its columns, so both tables scroll the same distance */
  }

  /* Fallback: the box scrolls both ways and the table's own head pins in it. */
  @supports not ${SUPPORTS_PAGE_SCROLL} {
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
  position: sticky;
  top: var(--table-head-top, 0px);
  z-index: 3;

  > div {
    left: 0;
    overflow: hidden;
    padding-bottom: 1px; /* keeps the head's 1px bottom line, a shadow, inside the clip */
    position: absolute;
    right: 0;
    top: 0;
  }

  @supports ${SUPPORTS_PAGE_SCROLL} {
    display: block;

    .MuiTable-root {
      animation: table-head-scroll-x linear both;
      animation-timeline: --table-scroll-x;
    }
  }

  @keyframes table-head-scroll-x {
    to {
      transform: translateX(calc(-100% + 100cqw));
    }
  }

  ${bpDownSm} {
    display: none;
  }
`;
