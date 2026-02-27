import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { bpDownMd } from "../../../../styles/common/mixins/breakpoints";

export const StyledStack = styled(Stack)`
  gap: 8px;
  margin: 16px 0;
  padding: 0 16px;

  ${bpDownMd} {
    margin: 8px 0;
  }
`;

export const StyledGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr auto;
`;
