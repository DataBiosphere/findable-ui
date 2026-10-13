import { Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import { JSX } from "react";
import { useProfile } from "../../../../../../../../../../hooks/authentication/profile/useProfile";
import { AuthenticationMenu } from "./components/AuthenticationMenu/authenticationMenu";
import { Button } from "./components/Button/button";
import { getSignInPath, navigateToSignIn } from "./utils";

/**
 * Props for the Authentication component.
 */
export interface AuthenticationProps {
  /**
   * `true` to enable the auth UI with the default sign-in path (`/login`),
   * a string to enable with a custom sign-in path (e.g. when NextAuth's
   * `pages.signIn` is configured elsewhere). Falsy disables the UI.
   */
  authenticationEnabled?: boolean | string;
  closeMenu: () => void;
  /** Renders the icon button variant, used once the header collapses to a menu. */
  isMenuIn?: boolean;
}

/**
 * Header authentication control.
 * Renders a loading skeleton while the profile loads, the account menu once signed in, and otherwise a sign in button that navigates to the sign-in path and back to the current page.
 * @param props - Component props.
 * @param props.authenticationEnabled - `true` to enable with the default sign-in path, a string to enable with that sign-in path; falsy disables it.
 * @param props.closeMenu - Function invoked to close the header menu once the sign-in navigation settles.
 * @param props.isMenuIn - Whether to render the icon button variant, used when the header is collapsed to a menu.
 * @returns The authentication control, or null when authentication is not enabled.
 */
export const Authentication = ({
  authenticationEnabled,
  closeMenu,
  isMenuIn,
}: AuthenticationProps): JSX.Element | null => {
  const { isLoading, profile } = useProfile();
  const { asPath } = useRouter();
  if (!authenticationEnabled) return null;
  if (isLoading) return <Skeleton height={32} variant="circular" width={32} />;
  if (profile) return <AuthenticationMenu profile={profile} />;
  const signInPath = getSignInPath(authenticationEnabled);
  return (
    <Button
      isMenuIn={isMenuIn}
      onClick={(): void => {
        void navigateToSignIn(signInPath, asPath, closeMenu);
      }}
      signInPath={signInPath}
    />
  );
};
