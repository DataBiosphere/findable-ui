import { ReactNode } from "react";

/**
 * A callback function to be stored and then executed upon successful login.
 */
export type LoginGuardCallback = (() => void) & {
  requiresToken?: boolean;
};

/**
 * Marks a login-guard callback as requiring credentials before execution.
 * @param callback - Callback to defer until credentials are available.
 * @returns A login-guard callback that waits for credentials before execution.
 */
export function withTokenRequirement(
  callback?: () => void,
): LoginGuardCallback | undefined {
  if (!callback) {
    return;
  }

  const guardedCallback = (() => {
    callback();
  }) as LoginGuardCallback;
  guardedCallback.requiresToken = true;
  return guardedCallback;
}

/**
 * The shape of the LoginGuard context, provides a function to trigger the
 * login process.
 */
export interface LoginGuardContextProps {
  requireLogin: (callback?: LoginGuardCallback) => void;
}

/**
 * The properties for the LoginGuardProvider component.
 */
export interface LoginGuardProviderProps {
  children: ReactNode;
}
