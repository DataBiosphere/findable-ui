import { MenuItem } from "@mui/material";
import React, { MouseEvent, useState } from "react";
import { UserProfile } from "../../../../../../../../../../../../hooks/useAuthentication/useFetchGoogleProfile";
import {
  Avatar,
  AuthenticationMenu as Menu,
  UserIcon,
  UserNames,
  UserSummary,
} from "./authenticationMenu.styles";

export interface AuthenticationMenuProps {
  onLogout: () => void;
  userProfile: UserProfile;
}

export const AuthenticationMenu = ({
  onLogout,
  userProfile,
}: AuthenticationMenuProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const open = Boolean(anchorEl);

  const onOpenMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenu = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <UserIcon onClick={onOpenMenu}>
        <Avatar
          alt={`${userProfile.given_name} ${userProfile.family_name}`}
          src={userProfile.picture}
        />
      </UserIcon>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        autoFocus={false}
        onClose={onCloseMenu}
        open={open}
        slotProps={{ paper: { variant: "menu" } }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
      >
        <UserSummary>
          You are signed in as:
          <UserNames noWrap>
            {userProfile.given_name} {userProfile.family_name}
          </UserNames>
        </UserSummary>
        <MenuItem
          onClick={(): void => {
            onCloseMenu();
            onLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
