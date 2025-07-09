import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { mediaTabletDown } from "../../../../../../../styles/common/mixins/breakpoints";

export const StyledGrid = styled(Grid)`
  display: grid;
  gap: 16px;
  margin: 16px;

  &:empty {
    display: none;
  }

  ${mediaTabletDown} {
    margin: 16px 0;
  }
`;
