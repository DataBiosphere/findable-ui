import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { BUTTON_GROUP_PROPS } from "../../../../styles/common/mui/buttonGroup";

export const StyledGrid = styled(Grid)`
  align-items: center;
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr auto;

  .${BUTTON_GROUP_PROPS.CLASSES.ROOT} {
    grid-column: 2;
  }
`;
