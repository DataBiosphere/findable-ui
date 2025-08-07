import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { bpDownSm } from "../../../../../../../styles/common/mixins/breakpoints";

export const StyledBox = styled(Box)`
  ${bpDownSm} {
    display: none;
  }
`;
