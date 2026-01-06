import { JSX, useCallback, useEffect, useRef, useState } from "react";
import { LoginDialog } from "../../components/common/LoginDialog/loginDialog";
import { useAuthenticationConfig } from "../../hooks/authentication/config/useAuthenticationConfig";
import { useConfig } from "../../hooks/useConfig";
import { useAuth } from "../authentication/auth/hook";
import { LoginGuardCallback, LoginGuardProviderProps } from "./common/types";
import { LoginGuardContext } from "./context";

/**
 * LoginGuardProvider is responsible for intercepting actions that require user authentication.
 * It provides a "requireLogin" function via context. When a protected action is triggered while the
 * user is unauthenticated, the LoginDialog is displayed. Upon successful authentication, the saved
 * callback is invoked.
 *
 * @param {LoginGuardProviderProps} props - The provider props that include children.
 * @returns The provider component.
 */
export function LoginGuardProvider({
  children,
}: LoginGuardProviderProps): JSX.Element {
  // Dialog open state.
  const [open, setOpen] = useState(false);

  // Use ref to store the callback without triggering re-render.
  const callbackRef = useRef<LoginGuardCallback | undefined>(undefined);

  // Determine if authentication is enabled.
  const authConfig = useAuthenticationConfig();

  // Determine if authentication is required for downloads and exports.
  const {
    config: { exportsRequireAuth },
  } = useConfig();

  // Get the user's authenticated state.
  const {
    authState: { isAuthenticated },
  } = useAuth();

  // If the user authenticates, close dialog then fire and clear callback.
  useEffect(() => {
    if (isAuthenticated) {
      setOpen(false);
      callbackRef.current?.();
      // Clear callback after firing.
      callbackRef.current = undefined;
    }
  }, [isAuthenticated]);

  // Handler to close the dialog.
  const onClose = useCallback(() => {
    setOpen(false);
    // Clear any stored callback.
    callbackRef.current = undefined;
  }, []);

  // Block actions that require authentication, or fire callback if already authenticated.
  const requireLogin = useCallback(
    (cb?: LoginGuardCallback) => {
      if (authConfig && exportsRequireAuth && !isAuthenticated) {
        callbackRef.current = cb;
        setOpen(true);
      } else {
        cb?.();
      }
    },
    [authConfig, exportsRequireAuth, isAuthenticated],
  );

  return (
    <LoginGuardContext.Provider value={{ requireLogin }}>
      {children}
      <LoginDialog open={open} onClose={onClose} />
    </LoginGuardContext.Provider>
  );
}
