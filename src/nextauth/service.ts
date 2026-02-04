import { signIn, SignInOptions, signOut, SignOutParams } from "next-auth/react";
import { ProviderId } from "../auth/types/common";

/**
 * NextAuth service.
 */
export const service = {
  /**
   * Login with the specified provider.
   * @param providerId - Provider identifier.
   * @param options - Sign in options.
   */
  login: (providerId: ProviderId, options?: SignInOptions): void => {
    signIn(providerId, options).catch((e: unknown) => console.error(e));
  },
  /**
   * Logout the user.
   * @param options - Sign out options.
   */
  logout: (options?: SignOutParams<boolean>): void => {
    signOut({
      callbackUrl: options?.callbackUrl,
      redirect: options?.redirect || false,
    }).catch((e: unknown) => console.error(e));
  },
};
