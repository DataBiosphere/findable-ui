import styled from "@emotion/styled";
import { Table as MTable } from "@mui/material";
import { smokeLightest, white } from "../../../styles/common/mixins/colors";

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
    display: contents; /* required; allows grandchildren of grid template to appear as though direct child */
  }

  tr {
    background-color: ${white};
  }

  td,
  th {
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

  [id^="grouped-row"] {
    background-color: ${smokeLightest};

    td {
      background-color: inherit;
      grid-column: 1 / -1;
    }
  }
`;
