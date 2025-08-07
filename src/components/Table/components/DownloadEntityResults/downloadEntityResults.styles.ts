import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { bpDownSm } from "../../../../styles/common/mixins/breakpoints";

export const StyledButton = styled(Button)`
  ${bpDownSm} {
    display: none;
  }
`;
