import { useConfig } from "../useConfig";

/**
 * Returns data URL for the integrations end point.
 * @returns data URL for the integrations end point.
 */
export const useFileManifestURL = (): string => {
  const { config } = useConfig();
  const { dataSource } = config;
  const { url } = dataSource;
  return url;
};
