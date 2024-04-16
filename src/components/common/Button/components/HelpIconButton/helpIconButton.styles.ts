import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";

export const HelpIconButton = styled(ButtonBase)`
  align-self: flex-start;
  color: ${({ theme }) => theme.palette.ink.light};
  vertical-align: bottom; // Vertical alignment is required to align the icon with text styles "textBody400".
` as typeof ButtonBase;
