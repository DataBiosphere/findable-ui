import styled from "@emotion/styled";
import {
  Avatar,
  IconButton as MIconButton,
  Menu as MMenu,
  MenuItem,
  Typography,
} from "@mui/material";

export const AuthenticationMenu = styled(MMenu)`
  margin: 4px 0;
`;

export const UserIcon = styled(MIconButton)`
  padding: 0;
`;

export const UserSummary = styled(MenuItem)`
  display: block;
  cursor: inherit;
  border-bottom: 1px solid ${({ theme }) => theme.palette.smoke.main};
  padding-bottom: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  &:hover,
  &:focus {
    background: inherit;
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
