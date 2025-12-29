import { useConfig } from "../../../../hooks/useConfig";
import { getEntityConfig } from "../../../../config/utils";
import { EntityConfig } from "../../../../config/entities";
import { useMemo } from "react";

/**
 * Hook for retrieving entities (entity list) configuration based on entity identifier.
 *
 * @param entityListType - Entity identifier.
 * @returns Entities (entity list) configuration.
 */
export const useEntities = (entityListType: string): EntityConfig => {
  const { config } = useConfig();
  const { entities } = config;
  return useMemo(
    () => getEntityConfig(entities, entityListType),
    [entities, entityListType],
  );
};
