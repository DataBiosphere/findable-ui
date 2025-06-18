import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { mediaTabletDown } from "../../../../styles/common/mixins/breakpoints";

export const StyledGrid = styled(Grid)`
  align-items: center;
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr auto;

  ${mediaTabletDown} {
    grid-template-columns: 1fr;
  }
`;
