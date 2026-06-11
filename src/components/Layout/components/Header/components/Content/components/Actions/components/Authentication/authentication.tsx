import { LoginRounded } from "@mui/icons-material";
import {
  ButtonProps as MButtonProps,
  IconButton as MIconButton,
  IconButtonProps as MIconButtonProps,
  Skeleton,
} from "@mui/material";
import Router, { useRouter } from "next/router";
import { ElementType, JSX } from "react";
import { useProfile } from "../../../../../../../../../../hooks/authentication/profile/useProfile";
import { isNavigationLinkSelected } from "../../../Navigation/common/utils";
import { AuthenticationMenu } from "./components/AuthenticationMenu/authenticationMenu";
import { StyledButton } from "./components/Button/button.styles";
import { getSignInPath, getSignInPathPattern } from "./utils";

export interface AuthenticationProps {
  /**
   * `true` to enable the auth UI with the default sign-in path (`/login`),
   * a string to enable with a custom sign-in path (e.g. when NextAuth's
   * `pages.signIn` is configured elsewhere). Falsy disables the UI.
   */
  authenticationEnabled?: boolean | string;
  Button: ElementType<MButtonProps> | ElementType<MIconButtonProps>;
  closeMenu: () => void;
}

export const Authentication = ({
  authenticationEnabled,
  Button,
  closeMenu,
}: AuthenticationProps): JSX.Element | null => {
  const { isLoading, profile } = useProfile();
  const { asPath } = useRouter();
  if (!authenticationEnabled) return null;
  if (isLoading) return <Skeleton height={32} variant="circular" width={32} />;
  if (profile) return <AuthenticationMenu profile={profile} />;
  const signInPath = getSignInPath(authenticationEnabled);
  return (
    <Button
      onClick={async (): Promise<void> => {
        await Router.push({
          pathname: signInPath,
          query: { callbackUrl: asPath },
        });
        closeMenu();
      }}
    />
  );
};

/**
 * Renders authentication button.
 * @param props - Button props.
 * @param pathname - Pathname.
 * @param signInPath - Sign-in path used for the active state (see `getSignInPath`).
 * @returns button.
 */
export function renderButton(
  props: MButtonProps,
  pathname: string,
  signInPath: string,
): JSX.Element {
  return (
    <StyledButton
      startIcon={<LoginRounded />}
      variant={
        isNavigationLinkSelected(pathname, [getSignInPathPattern(signInPath)])
          ? "activeNav"
          : "nav"
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
      <LoginRounded />
    </MIconButton>
  );
}
