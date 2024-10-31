import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import {
  ButtonProps as MButtonProps,
  IconButton as MIconButton,
  IconButtonProps as MIconButtonProps,
  Skeleton,
} from "@mui/material";
import Router from "next/router";
import React, { ElementType } from "react";
import { useProfile } from "../../../../../../../../../../hooks/authentication/profile/useProfile";
import { ROUTE } from "../../../../../../../../../../routes/constants";
import { isNavigationLinkSelected } from "../../../Navigation/common/utils";
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
  const { isLoading, profile } = useProfile();
  if (!authenticationEnabled) return null;
  if (isLoading) return <Skeleton height={32} variant="circular" width={32} />;
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
 * @param pathname - Pathname.
 * @returns button.
 */
export function renderButton(
  props: MButtonProps,
  pathname: string
): JSX.Element {
  return (
    <StyledButton
      startIcon={<LoginRoundedIcon />}
      variant={
        isNavigationLinkSelected(pathname, [ROUTE.LOGIN]) ? "activeNav" : "nav"
      }
      {...props}
    >
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
