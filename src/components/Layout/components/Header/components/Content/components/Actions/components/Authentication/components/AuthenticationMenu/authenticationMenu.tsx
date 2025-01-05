import { MenuItem } from "@mui/material";
import React, { Fragment } from "react";
import { useAuth } from "../../../../../../../../../../../../providers/authentication/auth/hook";
import { UserProfile } from "../../../../../../../../../../../../providers/authentication/authentication/types";
import { useMenu } from "../../../../../../../../../../../common/Menu/hooks/useMenu";
import {
  AuthenticationMenu as Menu,
  StyledAvatar,
  UserIcon,
  UserNames,
  UserSummary,
} from "./authenticationMenu.styles";
import { MENU_PROPS } from "./constants";

export interface AuthenticationMenuProps {
  profile: UserProfile;
}

export const AuthenticationMenu = ({
  profile,
}: AuthenticationMenuProps): JSX.Element => {
  const { service: { requestLogout } = {} } = useAuth();
  const { anchorEl, onClose, onOpen, open } = useMenu<HTMLElement>();
  return (
    <Fragment>
      <UserIcon onClick={onOpen}>
        <StyledAvatar alt={profile.name} src={profile.image} />
      </UserIcon>
      <Menu {...MENU_PROPS} anchorEl={anchorEl} onClose={onClose} open={open}>
        <UserSummary>
          You are signed in as:
          <UserNames noWrap>{profile.name}</UserNames>
        </UserSummary>
        <MenuItem
          onClick={(): void => {
            requestLogout?.();
            onClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};
