import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { bpDownMd } from "../../../../styles/common/mixins/breakpoints";

export const StyledStack = styled(Stack)`
  margin: 8px 0;
  padding: 8px 16px;

  ${bpDownMd} {
    padding: 0 16px;
  }
`;

export const StyledGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr auto;
`;
