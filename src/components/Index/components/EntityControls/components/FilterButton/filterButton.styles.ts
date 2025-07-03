import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { mediaDesktopSmallUp } from "../../../../../../styles/common/mixins/breakpoints";

export const StyledButton = styled(Button)`
  padding: 8px 16px;

  ${mediaDesktopSmallUp} {
    display: none;
  }
`;
