import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { bpUpMd } from "../../../../../../../styles/common/mixins/breakpoints";

export const StyledButton = styled(Button)`
  ${bpUpMd} {
    display: none;
  }
`;
