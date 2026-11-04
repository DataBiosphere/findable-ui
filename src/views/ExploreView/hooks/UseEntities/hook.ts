import { useMemo } from "react";
import type { EntityConfig } from "../../../../config/entities";
import { getEntityConfig } from "../../../../config/utils";
import { useConfig } from "../../../../hooks/useConfig";

/**
 * Returns the entity list's config for the given entity list type, read straight from the site config.
 * @param entityListType - Entity list type.
 * @returns Entity list config.
 */
export const useEntities = <T = unknown>(
  entityListType: string,
): EntityConfig<T> => {
  const { config } = useConfig();
  const { entities } = config;
  return useMemo(
    () => getEntityConfig(entities, entityListType),
    [entities, entityListType],
  );
};
