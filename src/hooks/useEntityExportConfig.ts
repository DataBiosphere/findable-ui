import { ExportConfig } from "../config/entities";
import { useConfig } from "./useConfig";

/**
 * Returns the export configuration for the given entity.
 * @returns export configuration.
 */
export const useEntityExportConfig = (): ExportConfig => {
  const { entityConfig } = useConfig();

  if (!entityConfig.export) {
    throw new Error("This entity config does not have an export field set");
  }

  return entityConfig.export;
};
