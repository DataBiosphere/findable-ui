import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { bpDownMd } from "../../../../../../styles/common/mixins/breakpoints";

export const StyledBox = styled(Box)`
  margin-bottom: -16px;
  padding: 16px;

  ${bpDownMd} {
    margin-bottom: 0;
  }
`;
