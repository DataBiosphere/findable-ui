import { ExportConfig } from "../config/entities";
import { useConfig } from "./useConfig";

/**
 * Returns the export configuration for the given site.
 * @returns export configuration.
 */
export const useExportConfig = (): ExportConfig => {
  const { config } = useConfig();

  if (!config.export) {
    throw new Error(`This config does not have an export field set`);
  }

  return config.export;
};
