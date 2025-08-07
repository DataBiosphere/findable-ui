import styled from "@emotion/styled";
import { TableContainer as MTableContainer } from "@mui/material";
import { FONT } from "../../../../../../styles/common/constants/font";
import { PALETTE } from "../../../../../../styles/common/constants/palette";
import { bpUpSm } from "../../../../../../styles/common/mixins/breakpoints";

export const SectionTitle = styled("h4")`
  background-color: ${PALETTE.COMMON_WHITE};
  font: ${FONT.BODY_LARGE_500};
  margin: 0;
  padding: 20px 16px;

  ${bpUpSm} {
    padding: 20px;
  }
`;

export const TableContainer = styled(MTableContainer)`
  td,
  th {
    padding: 12px 16px;
  }

  td {
    min-height: 56px;
  }

  ${bpUpSm} {
    td,
    th {
      padding: 12px 20px;
    }
  }
`;
