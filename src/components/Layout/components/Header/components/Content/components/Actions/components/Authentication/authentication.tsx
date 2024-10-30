import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import {
  ButtonProps as MButtonProps,
  IconButton as MIconButton,
  IconButtonProps as MIconButtonProps,
} from "@mui/material";
import Router from "next/router";
import React, { ElementType } from "react";
import { useProfile } from "../../../../../../../../../../hooks/authentication/profile/useProfile";
import { ROUTE } from "../../../../../../../../../../routes/constants";
import { AuthenticationMenu } from "./components/AuthenticationMenu/authenticationMenu";
import { StyledButton } from "./components/Button/button.styles";

export interface AuthenticationProps {
  authenticationEnabled?: boolean;
  Button: ElementType<MButtonProps> | ElementType<MIconButtonProps>;
  closeMenu: () => void;
}

export const Authentication = ({
  authenticationEnabled,
  Button,
  closeMenu,
}: AuthenticationProps): JSX.Element | null => {
  const { profile } = useProfile();
  if (!authenticationEnabled) return null;
  if (profile) return <AuthenticationMenu profile={profile} />;
  return (
    <Button
      onClick={async (): Promise<void> => {
        await Router.push(ROUTE.LOGIN);
        closeMenu();
      }}
    />
  );
};

/**
 * Renders authentication button.
 * @param props - Button props.
 * @returns button.
 */
export function renderButton(props: MButtonProps): JSX.Element {
  return (
    <StyledButton startIcon={<LoginRoundedIcon />} variant="nav" {...props}>
      Sign in
    </StyledButton>
  );
}

/**
 * Renders authentication icon button.
 * @param props - Button props.
 * @returns icon button.
 */
export function renderIconButton(props: MIconButtonProps): JSX.Element {
  return (
    <MIconButton color="ink" {...props}>
      <LoginRoundedIcon />
    </MIconButton>
  );
}
