import { Session } from "next-auth";
import { SessionContextValue } from "next-auth/react";
import {
  AUTHENTICATION_STATUS,
  UpdateAuthenticationPayload,
  UserProfile,
} from "../../../../providers/authentication/authentication/types";
import {
  AUTHORIZATION_STATUS,
  UpdateAuthorizationStatusPayload,
} from "../../../../providers/authentication/authorization/types";

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
    status: mapAuthenticationStatus(session.status),
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
 * Returns the authentication status based on the session status.
 * @param status - Session status.
 * @returns authentication status.
 */
function mapAuthenticationStatus(
  status: SessionContextValue["status"]
): AUTHENTICATION_STATUS {
  switch (status) {
    case "authenticated":
      return AUTHENTICATION_STATUS.AUTHENTICATED;
    case "loading":
      return AUTHENTICATION_STATUS.PENDING;
    default:
      return AUTHENTICATION_STATUS.UNAUTHENTICATED;
  }
}

/**
 * Maps the session context value to an authorization status.
 * @param session - Session context value.
 * @returns authorization status.
 */
export function mapAuthorization(
  session: SessionContextValue
): UpdateAuthorizationStatusPayload {
  switch (session.status) {
    case "authenticated":
      return AUTHORIZATION_STATUS.AUTHORIZED;
    case "loading":
      return AUTHORIZATION_STATUS.PENDING;
    default:
      return AUTHORIZATION_STATUS.UNAUTHORIZED;
  }
}
