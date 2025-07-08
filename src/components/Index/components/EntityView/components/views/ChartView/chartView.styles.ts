import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { GridPaperSection } from "../../../../../../common/Section/section.styles";

export const StyledGrid = styled(Grid)`
  display: grid;
  gap: inherit;
  overflow-y: auto;
`;

export const StyledGridPaperSection = styled(GridPaperSection)`
  &:last-of-type {
    border-radius: inherit;
  }
`;
