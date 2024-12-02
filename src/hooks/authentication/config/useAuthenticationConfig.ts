import { AuthenticationConfig } from "../../../config/entities";
import { useConfig } from "../../useConfig";

/**
 * Returns the authentication configuration.
 * @returns authentication configuration.
 */
export const useAuthenticationConfig = (): AuthenticationConfig | undefined => {
  const {
    config: { authentication },
  } = useConfig();
  return authentication;
};
