import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";
import { PALETTE } from "../../../../../styles/common/constants/palette";

export const HelpIconButton = styled(ButtonBase)`
  align-self: flex-start;
  color: ${PALETTE.INK_LIGHT};
  vertical-align: bottom; // Vertical alignment is required to align the icon with text styles "textBody400".
` as typeof ButtonBase;
