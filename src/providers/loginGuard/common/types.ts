import { ReactNode } from "react";

/**
 * A callback function to be stored and then executed upon successful login.
 */
export type LoginGuardCallback = () => void;

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
