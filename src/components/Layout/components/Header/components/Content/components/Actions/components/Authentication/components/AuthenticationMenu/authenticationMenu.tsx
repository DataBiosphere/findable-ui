import { MenuItem } from "@mui/material";
import { Fragment, JSX } from "react";
import { useAuth } from "../../../../../../../../../../../../auth/hooks/useAuth";
import { UserProfile } from "../../../../../../../../../../../../auth/types/authentication";
import { useMenu } from "../../../../../../../../../../../common/Menu/hooks/useMenu";
import {
  AuthenticationMenu as Menu,
  StyledAvatar,
  UserIcon,
  UserNames,
  UserSummary,
} from "./authenticationMenu.styles";
import { ARIA_LABEL, MENU_PROPS } from "./constants";

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
      {/*
       * MUI Avatar only renders an <img alt> when src loads; with no src it
       * renders an aria-hidden fallback icon, leaving the button unnamed.
       */}
      <UserIcon aria-label={ARIA_LABEL.ACCOUNT_MENU} onClick={onOpen}>
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
