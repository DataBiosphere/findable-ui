import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import { mediaTabletDown } from "../../../../../../styles/common/mixins/breakpoints";

export const StyledBox = styled(Box)`
  ${mediaTabletDown} {
    display: none;
  }
`;

export const StyledButton = styled(Button)`
  max-width: fit-content;
  padding: 8px 16px;
` as typeof Button;
