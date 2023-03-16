import { AuthenticationConfig } from "../config/entities";
import { useConfig } from "./useConfig";

/**
 * Hook to get the authentication config
 * @returns @see AuthenticationConfig used in the current config.
 */
export const useAuthenticationConfig = (): AuthenticationConfig => {
  const { config } = useConfig();

  if (!config.authentication) {
    return {
      title: "",
    };
  }

  return config.authentication;
};
