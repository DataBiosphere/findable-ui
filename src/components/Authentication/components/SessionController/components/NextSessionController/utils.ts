import { Session } from "next-auth";
import { SessionContextValue } from "next-auth/react";
import {
  AUTH_STATUS,
  UpdateAuthStatePayload,
} from "../../../../../../providers/authentication/auth/types";
import {
  AUTHENTICATION_STATUS,
  UpdateAuthenticationPayload,
  UserProfile,
} from "../../../../../../providers/authentication/authentication/types";
import { AUTH_STATUS_MAP, AUTHENTICATION_STATUS_MAP } from "./constants";

/**
 * Returns the auth state from the session context.
 * @param session - Session context value.
 * @returns auth state.
 */
export function mapAuth(session: SessionContextValue): UpdateAuthStatePayload {
  return {
    isAuthenticated: session.status === "authenticated",
    status: mapStatus(session.status, AUTH_STATUS_MAP, AUTH_STATUS.SETTLED),
  };
}

/**
 * Returns the authentication profile and status from the session context.
 * @param session - Session context value.
 * @returns authentication profile and status.
 */
export function mapAuthentication(
  session: SessionContextValue
): UpdateAuthenticationPayload {
  return {
    profile: mapProfile(session.data),
    status: mapStatus(
      session.status,
      AUTHENTICATION_STATUS_MAP,
      AUTHENTICATION_STATUS.SETTLED
    ),
  };
}

/**
 * Maps the session data to a user profile.
 * @param sessionData - Session data.
 * @returns user profile.
 */
function mapProfile(sessionData: Session | null): UserProfile | undefined {
  if (!sessionData) return;
  const { user } = sessionData;
  if (!user) return;
  const { email, image, name } = user;
  return {
    email: email || "",
    image: image || "",
    name: name || "",
  };
}

/**
 * Returns the auth or authentication status <S> based on the session status.
 * @param status - Session status.
 * @param statusBySessionStatus - Map of session status to auth or authentication status.
 * @param defaultStatus - Default auth or authentication status.
 * @returns auth or authentication status.
 */
function mapStatus<S>(
  status: SessionContextValue["status"],
  statusBySessionStatus: Record<SessionContextValue["status"], S>,
  defaultStatus: S
): S {
  return statusBySessionStatus[status] || defaultStatus;
}
