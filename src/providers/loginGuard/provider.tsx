import { JSX, useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { LoginDialog } from "../../components/common/LoginDialog/loginDialog";
import { useAuthenticationConfig } from "../../hooks/authentication/config/useAuthenticationConfig";
import { useConfig } from "../../hooks/useConfig";
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

  // Adjust-during-render: when the user transitions to authenticated,
  // close the login dialog. Pure state sync — no side effects here.
  const [prevIsAuthenticated, setPrevIsAuthenticated] =
    useState(isAuthenticated);
  if (isAuthenticated !== prevIsAuthenticated) {
    setPrevIsAuthenticated(isAuthenticated);
    if (isAuthenticated) setOpen(false);
  }

  // Post-commit side effect: when the user transitions to authenticated,
  // fire the stored callback (which can do anything — downloads, navigation,
  // dispatches) and clear it. Must run in an effect, not during render.
  useEffect(() => {
    if (isAuthenticated) {
      callbackRef.current?.();
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
