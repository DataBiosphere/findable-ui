import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useAuthentication } from "../../../../../../../../../../hooks/useAuthentication/useAuthentication";
import { AuthenticationMenu } from "./components/AuthenticationMenu/authenticationMenu";
import { RequestAuthentication } from "./components/RequestAuthentication/requestAuthentication";

export interface AuthenticationProps {
  authenticationEnabled?: boolean;
  closeMenu: () => void;
}

export const Authentication = ({
  authenticationEnabled,
  closeMenu,
}: AuthenticationProps): JSX.Element => {
  const { isAuthenticated, requestAuthentication, userProfile } =
    useAuthentication();
  const router = useRouter();
  const onLogout = useCallback((): void => {
    location.href = router.basePath;
  }, [router]);
  return (
    <>
      {authenticationEnabled &&
        (isAuthenticated && userProfile ? (
          <AuthenticationMenu onLogout={onLogout} userProfile={userProfile} />
        ) : (
          <RequestAuthentication
            closeMenu={closeMenu}
            requestAuthorization={requestAuthentication}
          />
        ))}
    </>
  );
};
