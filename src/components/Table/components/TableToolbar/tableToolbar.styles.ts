import styled from "@emotion/styled";
import { white } from "../../../../styles/common/mixins/colors";
import { Grid } from "../../../common/Grid/grid";

export const TableToolbar = styled.div`
  align-items: center;
  background-color: ${white};
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

export const ToolbarActions = styled(Grid)`
  gap: 8px;
  grid-auto-flow: column;
`;
