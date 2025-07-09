import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { mediaTabletDown } from "../../../../styles/common/mixins/breakpoints";

export const StyledButton = styled(Button)`
  ${mediaTabletDown} {
    display: none;
  }
`;
