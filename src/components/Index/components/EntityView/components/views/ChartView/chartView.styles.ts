import styled from "@emotion/styled";
import { Grid, Stack } from "@mui/material";
import { PALETTE } from "../../../../../../../styles/common/constants/palette";
import {
  GridPaperSection,
  sectionPadding,
} from "../../../../../../common/Section/section.styles";

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

export const StyledStack = styled(Stack)`
  ${sectionPadding};
  background-color: ${PALETTE.COMMON_WHITE};
`;
