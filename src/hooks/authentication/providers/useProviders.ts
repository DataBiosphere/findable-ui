import { useCallback } from "react";
import { ProviderId } from "../../../providers/authentication/common/types";
import { useConfig } from "../../useConfig";
import { UseProviders } from "./types";

/**
 * Hook to facilitate the retrieval of authentication providers.
 * @returns authentication providers and a function to find a provider by id.
 */

export const useProviders = (): UseProviders => {
  const { config } = useConfig();
  const providers = config.authentication?.providers;

  const findProvider = useCallback(
    (providerId: ProviderId) => {
      return providers?.find(({ id }) => id === providerId);
    },
    [providers]
  );

  return { findProvider, providers };
};
