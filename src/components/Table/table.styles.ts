import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { TableContainer } from "@mui/material";
import { PALETTE } from "../../styles/common/constants/palette";
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

export const StyledTableScroll = styled.div`
  min-width: 0; /* lets the table container scroll sideways instead of growing */
`;

export const StyledTableContainer = styled(TableContainer, {
  shouldForwardProp: (prop) => prop !== "stickyHead",
})<{ stickyHead: boolean }>`
  ${({ stickyHead }) =>
    stickyHead &&
    css`
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    `}
`;

export const StyledStickyHead = styled("div", {
  shouldForwardProp: (prop) => prop !== "stuck",
})<{ stuck: boolean }>`
  height: 0;
  position: sticky;
  top: var(--table-head-top, 0);
  visibility: ${({ stuck }) => (stuck ? "visible" : "hidden")};
  z-index: 3; /* above the table head's z-index 2 in gridTable.styles */

  > div {
    box-shadow: 0 1px ${PALETTE.SMOKE_MAIN};
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export const StyledStickyScrollbar = styled.div`
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  position: sticky;
  z-index: 2;

  > div {
    height: 1px;
  }

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${PALETTE.SMOKE_DARK};
    border-radius: 4px;
  }
`;
