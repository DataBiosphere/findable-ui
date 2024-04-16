import styled from "@emotion/styled";
import { TableContainer as MTableContainer } from "@mui/material";
import { mediaTabletUp } from "../../../../../../styles/common/mixins/breakpoints";
import { white } from "../../../../../../styles/common/mixins/colors";
import { textBodyLarge500 } from "../../../../../../styles/common/mixins/fonts";

export const SectionTitle = styled("h4")`
  ${textBodyLarge500}
  background-color: ${white};
  margin: 0;
  padding: 20px 16px;

  ${mediaTabletUp} {
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

  ${mediaTabletUp} {
    td,
    th {
      padding: 12px 20px;
    }
  }
`;
