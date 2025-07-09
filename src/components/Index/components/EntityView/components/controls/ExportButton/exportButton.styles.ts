import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { mediaTabletDown } from "../../../../../../../styles/common/mixins/breakpoints";

export const StyledBox = styled(Box)`
  ${mediaTabletDown} {
    display: none;
  }
`;
