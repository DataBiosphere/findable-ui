import { Skeleton } from "@mui/material";
import Router, { useRouter } from "next/router";
import { JSX } from "react";
import { useProfile } from "../../../../../../../../../../hooks/authentication/profile/useProfile";
import { AuthenticationMenu } from "./components/AuthenticationMenu/authenticationMenu";
import { Button } from "./components/Button/button";
import { getSignInPath } from "./utils";

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
      onClick={async (): Promise<void> => {
        await Router.push({
          pathname: signInPath,
          query: { callbackUrl: asPath },
        });
        closeMenu();
      }}
      signInPath={signInPath}
    />
  );
};
