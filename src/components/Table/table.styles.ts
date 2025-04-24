import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { mediaDownSmall } from "../../styles/common/mixins/breakpoints";
import { GridTable as Table } from "./common/gridTable.styles";

interface Props {
  collapsable?: boolean;
}

export const GridTable = styled(Table, {
  shouldForwardProp: (prop) => prop !== "collapsable",
})<Props>`
  // Collapsable.
  ${mediaDownSmall} {
    ${({ collapsable }) =>
      collapsable &&
      css`
        grid-template-columns: 1fr;
      `};
  }
`;
