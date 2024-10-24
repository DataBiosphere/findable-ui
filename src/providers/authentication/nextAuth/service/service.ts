import { signIn, SignInOptions, signOut, SignOutParams } from "next-auth/react";
import { ProviderId } from "../../common/types";

export const service = {
  login: (providerId: ProviderId, options?: SignInOptions): void => {
    signIn(providerId, options).catch((e) => console.error(e));
  },
  logout: (options?: SignOutParams<boolean>): void => {
    signOut({
      callbackUrl: options?.callbackUrl,
      redirect: options?.redirect || false,
    }).catch((e) => console.error(e));
  },
};
