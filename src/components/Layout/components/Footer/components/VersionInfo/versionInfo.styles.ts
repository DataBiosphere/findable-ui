import styled from "@emotion/styled";
import { Chip } from "@mui/material";
import { inkLight } from "../../../../../../styles/common/mixins/colors";

export const StyledChip = styled(Chip)`
  align-self: center;
  border-radius: 4px;
  .MuiChip-label {
    color: ${inkLight};
  }
`;
