import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { bpDownSm } from "../../../../../../../styles/common/mixins/breakpoints";

export const StyledGrid = styled(Grid)`
  display: grid;
  gap: 16px;
  margin: 16px;

  &:empty {
    display: none;
  }

  ${bpDownSm} {
    margin: 16px 0;
  }
`;
