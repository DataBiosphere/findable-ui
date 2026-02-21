import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { bpUpMd } from "../../../../styles/common/mixins/breakpoints";

export const StyledStack = styled(Stack)`
  gap: 16px 0;
  margin: 8px 0;
  padding: 0 16px;

  ${bpUpMd} {
    padding: 8px 16px;
  }
`;
