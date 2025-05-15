import styled from "@emotion/styled";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { textBody500 } from "../../../../styles/common/mixins/fonts";

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
    ${textBody500}
    border-bottom: 1px solid ${PALETTE.SMOKE_MAIN};
  }

  td {
    font: inherit;
    overflow-wrap: break-word;
  }
`;
