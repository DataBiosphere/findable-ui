import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { mediaTabletDown } from "../../../../styles/common/mixins/breakpoints";
import { Dot } from "../../../common/Dot/dot";

export const StyledGrid = styled(Grid)`
  display: grid;
  gap: 4px;
  grid-auto-flow: column;
  max-width: fit-content;
  padding: 12px 16px;
`;

export const StyledDot = styled(Dot)`
  margin: 0 4px;

  ${mediaTabletDown} {
    display: none;
  }
`;
