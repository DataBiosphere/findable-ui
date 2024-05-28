import styled from "@emotion/styled";
import { Toolbar as MToolbar } from "@mui/material";
import { white } from "../../../../styles/common/mixins/colors";
import { Grid } from "../../../common/Grid/grid";

export const Toolbar = styled(MToolbar)`
  &.MuiToolbar-table {
    align-items: center;
    background-color: ${white};
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
` as typeof MToolbar;

export const ToolbarActions = styled(Grid)`
  gap: 8px;
  grid-auto-flow: column;
`;
