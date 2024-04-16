import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { mediaTabletDown } from "../../styles/common/mixins/breakpoints";
import { GridTable as Table } from "./common/gridTable.styles";

interface Props {
  collapsable?: boolean;
}

export const GridTable = styled(Table, {
  shouldForwardProp: (prop) => prop !== "collapsable",
})<Props>`
  // Collapsable.
  ${mediaTabletDown} {
    ${({ collapsable }) =>
      collapsable &&
      css`
        grid-template-columns: 1fr;
      `};
  }
`;
