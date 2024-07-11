import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { IconButton as MIconButton } from "@mui/material";
import React from "react";
import { useBreakpoint } from "../../../../../../../../../../../../hooks/useBreakpoint";
import { Button } from "./requestAuthentication.styles";

export interface RequestAuthenticationProps {
  closeMenu: () => void;
  requestAuthorization: () => void;
}

export const RequestAuthentication = ({
  closeMenu,
  requestAuthorization,
}: RequestAuthenticationProps): JSX.Element => {
  const { mdUp } = useBreakpoint();
  return mdUp ? (
    <Button
      onClick={requestAuthorization}
      startIcon={<LoginRoundedIcon />}
      variant="nav"
    >
      Sign in
    </Button>
  ) : (
    <MIconButton
      color="ink"
      onClick={(): void => {
        closeMenu();
        requestAuthorization();
      }}
    >
      <LoginRoundedIcon />
    </MIconButton>
  );
};
