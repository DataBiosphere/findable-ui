import styled from "@emotion/styled";
import {
  Avatar,
  IconButton as MIconButton,
  Menu as MMenu,
  MenuItem,
  Typography,
} from "@mui/material";
import { PALETTE } from "../../../../../../../../../../../../styles/common/constants/palette";

export const AuthenticationMenu = styled(MMenu)`
  margin: 4px 0;

  /* Keyboard focus looks like hover. */
  .MuiMenuItem-root.Mui-focusVisible {
    background-color: ${({ theme }) => theme.palette.action.hover};
  }
`;

export const UserIcon = styled(MIconButton)`
  padding: 0;
`;

export const UserSummary = styled(MenuItem)`
  display: block;
  border-bottom: 1px solid ${PALETTE.SMOKE_MAIN};
  padding-bottom: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  /* Disabled so focus and the arrow keys skip it; it still reads as plain text. */
  &.Mui-disabled {
    opacity: 1;
  }
`;

export const UserNames = styled(Typography)`
  font-weight: 500;
  max-width: 200px;
`;

export const StyledAvatar = styled(Avatar)`
  height: 32px;
  width: 32px;
`;
