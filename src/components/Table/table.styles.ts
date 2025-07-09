import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { PALETTE } from "../../styles/common/constants/palette";
import { mediaTabletDown } from "../../styles/common/mixins/breakpoints";
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
  ${mediaTabletDown} {
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
