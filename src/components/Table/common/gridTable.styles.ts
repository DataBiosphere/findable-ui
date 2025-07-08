import styled from "@emotion/styled";
import { Table as MTable } from "@mui/material";
import { PALETTE } from "../../../styles/common/constants/palette";
import { white } from "../../../styles/common/mixins/colors";

export interface GridTableProps {
  gridTemplateColumns: string;
}

export const GridTable = styled(MTable, {
  shouldForwardProp: (prop) => prop !== "gridTemplateColumns",
})<GridTableProps>`
  align-items: stretch;
  display: grid;
  gap: 1px 0;
  grid-template-columns: ${(props) => props.gridTemplateColumns};

  tbody,
  thead,
  tr {
    display: grid;
    gap: inherit;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
  }

  tr {
    background-color: ${white};
  }

  td {
    background-color: inherit;
  }

  td,
  th {
    align-items: center;
    border-bottom: none;
    display: flex; /* required; consumes 100% row height */
    overflow-wrap: break-word;

    > * {
      min-width: 0; /* required; flexbox child min-width property is "auto" by default making overflow-wrap ineffectual */
    }
  }

  &.MuiTable-stickyHeader {
    .MuiTableHead-root {
      box-shadow: 0px 1px ${PALETTE.SMOKE_MAIN};
      position: sticky;
      top: 0;
      z-index: 2;
    }
  }
`;
