import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import {
  ButtonProps as MButtonProps,
  IconButton as MIconButton,
  IconButtonProps as MIconButtonProps,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { ElementType, useCallback } from "react";
import { useAuthentication } from "../../../../../../../../../../hooks/useAuthentication/useAuthentication";
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
  const { isAuthenticated, requestAuthentication, userProfile } =
    useAuthentication();
  const router = useRouter();
  const onLogout = useCallback((): void => {
    location.href = router.basePath;
  }, [router]);

  if (!authenticationEnabled) return null;

  return (
    <>
      {isAuthenticated && userProfile ? (
        <AuthenticationMenu onLogout={onLogout} userProfile={userProfile} />
      ) : (
        <Button
          onClick={(): void => {
            requestAuthentication();
            closeMenu();
          }}
        />
      )}
    </>
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
