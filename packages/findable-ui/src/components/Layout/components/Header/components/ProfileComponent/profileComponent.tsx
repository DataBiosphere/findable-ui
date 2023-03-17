import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { Button, IconButton } from "@mui/material";
import React, { useContext } from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../../../hooks/useBreakpointHelper";
import { AuthContext } from "../../../../../../providers/authentication";
import { DESKTOP_SM } from "../../../../../../theme/common/breakpoints";
import { ProfileImage } from "./profile.styles";

export const ProfileComponent = (): JSX.Element => {
  const { isAuthorized, requestAuthorization, userProfile } =
    useContext(AuthContext);
  const profileImageURL = userProfile?.picture;
  const smDesktop = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, DESKTOP_SM);
  return (
    <>
      {isAuthorized ? (
        <ProfileImage profileImageURL={profileImageURL} />
      ) : smDesktop ? (
        <Button
          startIcon={<LoginRoundedIcon />}
          variant="nav"
          onClick={requestAuthorization}
        >
          Sign in
        </Button>
      ) : (
        <IconButton color="ink" onClick={requestAuthorization}>
          <LoginRoundedIcon />
        </IconButton>
      )}
    </>
  );
};
