import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { mediaDesktopSmallUp } from "../../../../../../../styles/common/mixins/breakpoints";

export const StyledButton = styled(Button)`
  ${mediaDesktopSmallUp} {
    display: none;
  }
`;
