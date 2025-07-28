import styled from "@emotion/styled";
import { ButtonGroup } from "@mui/material";
import { bpDown820 } from "../../../../../../styles/common/mixins/breakpoints";

export const StyledButtonGroup = styled(ButtonGroup)`
  ${bpDown820} {
    display: none;
  }
`;
