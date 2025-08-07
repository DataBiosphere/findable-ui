import styled from "@emotion/styled";
import { FONT } from "../../../../styles/common/constants/font";
import { PALETTE } from "../../../../styles/common/constants/palette";

export const StyledTable = styled("table")`
  border-collapse: collapse;
  margin: 16px 0;
  table-layout: fixed;
  width: 100%;

  thead {
    all: unset;
    display: table-header-group;
  }

  tbody {
    all: unset;
    display: table-row-group;
  }

  tr {
    all: unset;
    display: table-row;
  }

  td,
  th {
    display: table-cell;
    padding: 2px 4px;
  }

  th {
    border-bottom: 1px solid ${PALETTE.SMOKE_MAIN};
    font: ${FONT.BODY_500};
  }

  td {
    font: inherit;
    overflow-wrap: break-word;
  }
`;
