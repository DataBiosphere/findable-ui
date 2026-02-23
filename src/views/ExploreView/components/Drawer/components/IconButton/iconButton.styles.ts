import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { PALETTE } from "../../../../../../styles/common/constants/palette";

export const StyledIconButton = styled(IconButton)`
  color: ${PALETTE.COMMON_WHITE};
  left: calc(100% + 4px);
  position: absolute;
  top: 4px;
`;
