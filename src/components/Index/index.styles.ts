import styled from "@emotion/styled";
import { Grid } from "@mui/material";

interface Props {
  top: number;
}

export const StyledGrid = styled(Grid)<Props>`
  flex: 1;
  padding-top: ${({ top }) => top}px;
`;
