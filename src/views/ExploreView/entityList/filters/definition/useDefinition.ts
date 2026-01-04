import { useConfig } from "../../../../../hooks/useConfig";
import { useEntities } from "../../../hooks/UseEntities/hook";
import { useMemo } from "react";
import { UseCategory } from "./types";

/**
 * Resolves the category filter definition for a given entity list.
 *
 * This hook determines which category filter configuration should be used
 * for an entity list by applying the following precedence:
 *
 * 1. Entity-specific category filter definition (from `useEntities`)
 * 2. Fallback to the global application configuration (from `useConfig`)
 *
 * @param entityListType - Entity identifier.
 * @returns Category filter definition.
 */
export const useDefinition = (entityListType: string): UseCategory => {
  const { config } = useConfig();
  const { categoryGroupConfig } = useEntities(entityListType);

  const categoryDefinition = useMemo(
    () => categoryGroupConfig ?? config.categoryGroupConfig,
    [categoryGroupConfig, config.categoryGroupConfig],
  );

  if (!categoryDefinition)
    throw new Error(`Category group config not found for ${entityListType}`);

  return { categoryDefinition };
};
